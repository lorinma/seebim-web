import {Attribute} from "./attribute";
import {Feature} from "./feature";
import {UserPropertySet} from "./user-property-set";
import {PropertySet} from "./property-set";
import {PairwiseFeature} from "./pairwise-feature";
export class Entity {
  Features:Feature[];
  PairwiseFeature:PairwiseFeature[];
  Attribute:Attribute[];
  Geometry:any;
  FileID:string;
  PropertySets:PropertySet[];
  EntityType:string;
  _etag:string;
  _id:string;
  Links:string[];
  UserProperty:UserPropertySet[];
}
