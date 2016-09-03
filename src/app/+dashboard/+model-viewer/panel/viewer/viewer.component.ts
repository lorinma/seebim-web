import {Component, OnInit, ElementRef, Input} from '@angular/core';
import {EntityService} from "../../../../entity.service";
declare var THREE:any;
declare var jQuery:any;
@Component({
  moduleId: module.id,
  selector: 'app-viewer',
  templateUrl: 'viewer.component.html',
  styleUrls: ['viewer.component.css'],
  providers:[
    EntityService,
  ],
})
export class ViewerComponent implements OnInit {
  @Input() extent: Object;
  @Input() geometry: string;
  @Input() transformation: string;
  @Input() centroid: string;
  @Input() HEIGHT: number;
  @Input() WIDTH: number;
  private scene:any;
  private camera:any;
  private renderer:any;
  // private HEIGHT=600;
  // private WIDTH=600;
  private controls:any;
  constructor(private el:ElementRef,private _service:EntityService) {}
  //TODO orientation problem in non-axis aligned shape, because we didn't rotate?
  ngOnInit() {
    let geometry = this.getShape(this.geometry);
    this.camera=this.setCamera(geometry)
    this.setRenderer();
    let center=geometry.boundingBox.min.add(geometry.boundingBox.max).divideScalar(2);
    let obb=new THREE.BoxGeometry( this.extent['X'], this.extent['Y'], this.extent['Z'] );
    let data=this.transformation
    let material_obb = new THREE.MeshBasicMaterial( {
      color: 0x11214E,
      opacity:0.5,
      polygonOffset: true,
      polygonOffsetFactor: 1, // positive value pushes polygon further away
      polygonOffsetUnits: 1
    } );
    let m = new THREE.Matrix4();
    let obb_centroid=new THREE.Vector3(this.centroid['X'],this.centroid['Y'],this.centroid['Z'])
    m.setPosition(obb_centroid.addScaledVector(center, -1))
    obb.applyMatrix(m)
    let obb_mesh = new THREE.Mesh(obb,material_obb);
    geometry.center()
    let material_shape = new THREE.MeshBasicMaterial( {
      color: 0x4D464E,
      opacity:0.8,
      polygonOffset: true,
      polygonOffsetFactor: 1, // positive value pushes polygon further away
      polygonOffsetUnits: 1
    } );
    let shape = new THREE.Mesh(geometry,material_shape);
    this.scene = new THREE.Scene();
    this.addShape(shape);
    this.addShape(obb_mesh);
    this.viewerInit();
    this.viewAnimate();
  }
  addShape(shape:any){
    this.scene.add(shape);
    //set the wire frame color
    let egh = new THREE.EdgesHelper(shape, 0x000000 );
    egh.material.linewidth = 1;
    this.scene.add( egh );
  }
  getShape(geom_data:any){
    let geometry = new THREE.Geometry();
    let vertices = geom_data['Vertices'];
    for(var i in vertices){
      geometry.vertices.push(new THREE.Vector3(vertices[i][0], vertices[i][1], vertices[i][2]));
    }
    let faces = geom_data['Faces'];
    for(var i in faces){
      geometry.faces.push(new THREE.Face3(faces[i][0], faces[i][1], faces[i][2]));
    }
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry
  }
  setCamera(geometry:any){
    let aspectRatio = this.WIDTH / this.HEIGHT;
    let fov=90;
    /*  fov — Camera frustum vertical field of view. in degree
     aspectRatio — Camera frustum aspect ratio.
     nearPlane — Camera frustum near plane.
     farPlane — Camera frustum far plane.

     - http://threejs.org/docs/#Reference/Cameras/PerspectiveCamera

     In geometry, a frustum (plural: frusta or frustums)
     is the portion of a solid (normally a cone or pyramid)
     that lies between two parallel planes cutting it. - wikipedia.      */
    let objectSize=geometry.boundingSphere.radius;
    let extentZ=geometry.boundingBox.max.z-geometry.boundingBox.min.z;
    let dist=objectSize/Math.tan(fov * Math.PI/360);
    let cameraZ=dist+extentZ/2;
    let nearPlane = 0.1;
    let farPlane = cameraZ*3;
    let camera = new THREE.PerspectiveCamera(fov, aspectRatio, nearPlane, farPlane);
    camera.position.z = cameraZ;
    return camera
  }
  setRenderer(){
    this.renderer = new THREE.WebGLRenderer( { antialias: false, alpha: true } ); /*    Rendererererers particles.  */
    this.renderer.setSize( this.WIDTH, this.HEIGHT );
    this.renderer.setClearColor(0xFFFFFF);
    this.renderer.autoClear=true;
    this.controls = new THREE.TrackballControls( this.camera );
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;
    this.controls.noZoom = false;
    this.controls.noPan = false;
    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 0.3;
    this.controls.keys = [ 65, 83, 68 ];
  }
  viewerInit(){
    jQuery(this.el.nativeElement).find('#three').append(this.renderer.domElement);
    this.render();
  }
  render() {
    // this.camera.lookAt(this.shape.position);
    this.renderer.render(this.scene, this.camera);
  }
  viewAnimate() {
    var self = this;
    requestAnimationFrame(
      function(){
        self.viewAnimate()
      });
    this.controls.update();
    self.render();
  }
}
