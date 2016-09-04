# This file was automatically generated by SWIG (http://www.swig.org).
# Version 2.0.11
#
# Do not make changes to this file unless you know what you are doing--modify
# the SWIG interface file instead.





from sys import version_info
if version_info >= (3,0,0):
    new_instancemethod = lambda func, inst, cls: _ChFi2d.SWIG_PyInstanceMethod_New(func)
else:
    from new import instancemethod as new_instancemethod
if version_info >= (2,6,0):
    def swig_import_helper():
        from os.path import dirname
        import imp
        fp = None
        try:
            fp, pathname, description = imp.find_module('_ChFi2d', [dirname(__file__)])
        except ImportError:
            import _ChFi2d
            return _ChFi2d
        if fp is not None:
            try:
                _mod = imp.load_module('_ChFi2d', fp, pathname, description)
            finally:
                fp.close()
            return _mod
    _ChFi2d = swig_import_helper()
    del swig_import_helper
else:
    import _ChFi2d
del version_info
try:
    _swig_property = property
except NameError:
    pass # Python < 2.2 doesn't have 'property'.
def _swig_setattr_nondynamic(self,class_type,name,value,static=1):
    if (name == "thisown"): return self.this.own(value)
    if (name == "this"):
        if type(value).__name__ == 'SwigPyObject':
            self.__dict__[name] = value
            return
    method = class_type.__swig_setmethods__.get(name,None)
    if method: return method(self,value)
    if (not static):
        self.__dict__[name] = value
    else:
        raise AttributeError("You cannot add attributes to %s" % self)

def _swig_setattr(self,class_type,name,value):
    return _swig_setattr_nondynamic(self,class_type,name,value,0)

def _swig_getattr(self,class_type,name):
    if (name == "thisown"): return self.this.own()
    method = class_type.__swig_getmethods__.get(name,None)
    if method: return method(self)
    raise AttributeError(name)

def _swig_repr(self):
    try: strthis = "proxy of " + self.this.__repr__()
    except: strthis = ""
    return "<%s.%s; %s >" % (self.__class__.__module__, self.__class__.__name__, strthis,)

try:
    _object = object
    _newclass = 1
except AttributeError:
    class _object : pass
    _newclass = 0


def _swig_setattr_nondynamic_method(set):
    def set_attr(self,name,value):
        if (name == "thisown"): return self.this.own(value)
        if hasattr(self,name) or (name == "this"):
            set(self,name,value)
        else:
            raise AttributeError("You cannot add attributes to %s" % self)
    return set_attr


class SwigPyIterator(object):
    thisown = _swig_property(lambda x: x.this.own(), lambda x, v: x.this.own(v), doc='The membership flag')
    def __init__(self, *args, **kwargs): raise AttributeError("No constructor defined - class is abstract")
    __repr__ = _swig_repr
    __swig_destroy__ = _ChFi2d.delete_SwigPyIterator
    def __iter__(self): return self
SwigPyIterator.value = new_instancemethod(_ChFi2d.SwigPyIterator_value,None,SwigPyIterator)
SwigPyIterator.incr = new_instancemethod(_ChFi2d.SwigPyIterator_incr,None,SwigPyIterator)
SwigPyIterator.decr = new_instancemethod(_ChFi2d.SwigPyIterator_decr,None,SwigPyIterator)
SwigPyIterator.distance = new_instancemethod(_ChFi2d.SwigPyIterator_distance,None,SwigPyIterator)
SwigPyIterator.equal = new_instancemethod(_ChFi2d.SwigPyIterator_equal,None,SwigPyIterator)
SwigPyIterator.copy = new_instancemethod(_ChFi2d.SwigPyIterator_copy,None,SwigPyIterator)
SwigPyIterator.next = new_instancemethod(_ChFi2d.SwigPyIterator_next,None,SwigPyIterator)
SwigPyIterator.__next__ = new_instancemethod(_ChFi2d.SwigPyIterator___next__,None,SwigPyIterator)
SwigPyIterator.previous = new_instancemethod(_ChFi2d.SwigPyIterator_previous,None,SwigPyIterator)
SwigPyIterator.advance = new_instancemethod(_ChFi2d.SwigPyIterator_advance,None,SwigPyIterator)
SwigPyIterator.__eq__ = new_instancemethod(_ChFi2d.SwigPyIterator___eq__,None,SwigPyIterator)
SwigPyIterator.__ne__ = new_instancemethod(_ChFi2d.SwigPyIterator___ne__,None,SwigPyIterator)
SwigPyIterator.__iadd__ = new_instancemethod(_ChFi2d.SwigPyIterator___iadd__,None,SwigPyIterator)
SwigPyIterator.__isub__ = new_instancemethod(_ChFi2d.SwigPyIterator___isub__,None,SwigPyIterator)
SwigPyIterator.__add__ = new_instancemethod(_ChFi2d.SwigPyIterator___add__,None,SwigPyIterator)
SwigPyIterator.__sub__ = new_instancemethod(_ChFi2d.SwigPyIterator___sub__,None,SwigPyIterator)
SwigPyIterator_swigregister = _ChFi2d.SwigPyIterator_swigregister
SwigPyIterator_swigregister(SwigPyIterator)

import OCC.TopoDS
import OCC.MMgt
import OCC.Standard
import OCC.TCollection
import OCC.TopLoc
import OCC.gp
import OCC.TopAbs
import OCC.TopTools
import OCC.TColStd
import OCC.Message
ChFi2d_NotPlanar = _ChFi2d.ChFi2d_NotPlanar
ChFi2d_NoFace = _ChFi2d.ChFi2d_NoFace
ChFi2d_InitialisationError = _ChFi2d.ChFi2d_InitialisationError
ChFi2d_ParametersError = _ChFi2d.ChFi2d_ParametersError
ChFi2d_Ready = _ChFi2d.ChFi2d_Ready
ChFi2d_IsDone = _ChFi2d.ChFi2d_IsDone
ChFi2d_ComputationError = _ChFi2d.ChFi2d_ComputationError
ChFi2d_ConnexionError = _ChFi2d.ChFi2d_ConnexionError
ChFi2d_TangencyError = _ChFi2d.ChFi2d_TangencyError
ChFi2d_FirstEdgeDegenerated = _ChFi2d.ChFi2d_FirstEdgeDegenerated
ChFi2d_LastEdgeDegenerated = _ChFi2d.ChFi2d_LastEdgeDegenerated
ChFi2d_BothEdgesDegenerated = _ChFi2d.ChFi2d_BothEdgesDegenerated
ChFi2d_NotAuthorized = _ChFi2d.ChFi2d_NotAuthorized
class chfi2d(object):
    thisown = _swig_property(lambda x: x.this.own(), lambda x, v: x.this.own(v), doc='The membership flag')
    def __init__(self, *args, **kwargs): raise AttributeError("No constructor defined")
    __repr__ = _swig_repr
    def __del__(self):
    	try:
    		self.thisown = False
    		GarbageCollector.garbage.collect_object(self)
    	except:
    		pass


chfi2d._kill_pointed = new_instancemethod(_ChFi2d.chfi2d__kill_pointed,None,chfi2d)
chfi2d_swigregister = _ChFi2d.chfi2d_swigregister
chfi2d_swigregister(chfi2d)

class ChFi2d_AnaFilletAlgo(object):
    thisown = _swig_property(lambda x: x.this.own(), lambda x, v: x.this.own(v), doc='The membership flag')
    __repr__ = _swig_repr
    def __init__(self, *args): 
        """
        * An empty constructor. Use the method Init() to initialize the class.

        :rtype: None

        * A constructor. It expects a wire consisting of two edges of type (any combination of): - segment - arc of circle.

        :param theWire:
        :type theWire: TopoDS_Wire &
        :param thePlane:
        :type thePlane: gp_Pln
        :rtype: None

        * A constructor. It expects two edges having a common point of type: - segment - arc of circle.

        :param theEdge1:
        :type theEdge1: TopoDS_Edge &
        :param theEdge2:
        :type theEdge2: TopoDS_Edge &
        :param thePlane:
        :type thePlane: gp_Pln
        :rtype: None

        """
        _ChFi2d.ChFi2d_AnaFilletAlgo_swiginit(self,_ChFi2d.new_ChFi2d_AnaFilletAlgo(*args))
    def Init(self, *args):
        """
        * Initializes the class by a wire consisting of two edges.

        :param theWire:
        :type theWire: TopoDS_Wire &
        :param thePlane:
        :type thePlane: gp_Pln
        :rtype: None

        * Initializes the class by two edges.

        :param theEdge1:
        :type theEdge1: TopoDS_Edge &
        :param theEdge2:
        :type theEdge2: TopoDS_Edge &
        :param thePlane:
        :type thePlane: gp_Pln
        :rtype: None

        """
        return _ChFi2d.ChFi2d_AnaFilletAlgo_Init(self, *args)

    def Perform(self, *args):
        """
        * Calculates a fillet.

        :param radius:
        :type radius: float
        :rtype: bool

        """
        return _ChFi2d.ChFi2d_AnaFilletAlgo_Perform(self, *args)

    def Result(self, *args):
        """
        * Retrieves a result (fillet and shrinked neighbours).

        :param e1:
        :type e1: TopoDS_Edge &
        :param e2:
        :type e2: TopoDS_Edge &
        :rtype: TopoDS_Edge

        """
        return _ChFi2d.ChFi2d_AnaFilletAlgo_Result(self, *args)

    def __del__(self):
    	try:
    		self.thisown = False
    		GarbageCollector.garbage.collect_object(self)
    	except:
    		pass


ChFi2d_AnaFilletAlgo.Init = new_instancemethod(_ChFi2d.ChFi2d_AnaFilletAlgo_Init,None,ChFi2d_AnaFilletAlgo)
ChFi2d_AnaFilletAlgo.Perform = new_instancemethod(_ChFi2d.ChFi2d_AnaFilletAlgo_Perform,None,ChFi2d_AnaFilletAlgo)
ChFi2d_AnaFilletAlgo.Result = new_instancemethod(_ChFi2d.ChFi2d_AnaFilletAlgo_Result,None,ChFi2d_AnaFilletAlgo)
ChFi2d_AnaFilletAlgo._kill_pointed = new_instancemethod(_ChFi2d.ChFi2d_AnaFilletAlgo__kill_pointed,None,ChFi2d_AnaFilletAlgo)
ChFi2d_AnaFilletAlgo_swigregister = _ChFi2d.ChFi2d_AnaFilletAlgo_swigregister
ChFi2d_AnaFilletAlgo_swigregister(ChFi2d_AnaFilletAlgo)

class ChFi2d_Builder(object):
    thisown = _swig_property(lambda x: x.this.own(), lambda x, v: x.this.own(v), doc='The membership flag')
    __repr__ = _swig_repr
    def __init__(self, *args): 
        """
        :rtype: None

        * The face <F> can be build on a closed or an open wire.

        :param F:
        :type F: TopoDS_Face &
        :rtype: None

        """
        _ChFi2d.ChFi2d_Builder_swiginit(self,_ChFi2d.new_ChFi2d_Builder(*args))
    def Init(self, *args):
        """
        :param F:
        :type F: TopoDS_Face &
        :rtype: None

        :param RefFace:
        :type RefFace: TopoDS_Face &
        :param ModFace:
        :type ModFace: TopoDS_Face &
        :rtype: None

        """
        return _ChFi2d.ChFi2d_Builder_Init(self, *args)

    def AddFillet(self, *args):
        """
        * Add a fillet of radius <Radius> on the wire between the two edges connected to the vertex <V>. <AddFillet> returns the fillet edge. The returned edge has sense only if the status <status> is <IsDone>

        :param V:
        :type V: TopoDS_Vertex &
        :param Radius:
        :type Radius: float
        :rtype: TopoDS_Edge

        """
        return _ChFi2d.ChFi2d_Builder_AddFillet(self, *args)

    def ModifyFillet(self, *args):
        """
        * modify the fillet radius and return the new fillet edge. this edge has sense only if the status <status> is <IsDone>.

        :param Fillet:
        :type Fillet: TopoDS_Edge &
        :param Radius:
        :type Radius: float
        :rtype: TopoDS_Edge

        """
        return _ChFi2d.ChFi2d_Builder_ModifyFillet(self, *args)

    def RemoveFillet(self, *args):
        """
        * removes the fillet <Fillet> and returns the vertex connecting the two adjacent edges to this fillet.

        :param Fillet:
        :type Fillet: TopoDS_Edge &
        :rtype: TopoDS_Vertex

        """
        return _ChFi2d.ChFi2d_Builder_RemoveFillet(self, *args)

    def AddChamfer(self, *args):
        """
        * Add a chamfer on the wire between the two edges connected <E1> and <E2>. <AddChamfer> returns the chamfer edge. This edge has sense only if the status <status> is <IsDone>.

        :param E1:
        :type E1: TopoDS_Edge &
        :param E2:
        :type E2: TopoDS_Edge &
        :param D1:
        :type D1: float
        :param D2:
        :type D2: float
        :rtype: TopoDS_Edge

        * Add a chamfer on the wire between the two edges connected to the vertex <V>. The chamfer will make an angle <Ang> with the edge <E>, and one of its extremities will be on <E> at distance <D>. The returned edge has sense only if the status <status> is <IsDone>. Warning: The value of <Ang> must be expressed in Radian.

        :param E:
        :type E: TopoDS_Edge &
        :param V:
        :type V: TopoDS_Vertex &
        :param D:
        :type D: float
        :param Ang:
        :type Ang: float
        :rtype: TopoDS_Edge

        """
        return _ChFi2d.ChFi2d_Builder_AddChamfer(self, *args)

    def ModifyChamfer(self, *args):
        """
        * modify the chamfer <Chamfer> and returns the new chamfer edge. This edge as sense only if the status <status> is <IsDone>.

        :param Chamfer:
        :type Chamfer: TopoDS_Edge &
        :param E1:
        :type E1: TopoDS_Edge &
        :param E2:
        :type E2: TopoDS_Edge &
        :param D1:
        :type D1: float
        :param D2:
        :type D2: float
        :rtype: TopoDS_Edge

        * modify the chamfer <Chamfer> and returns the new chamfer edge. This edge as sense only if the status <status> is <IsDone>. Warning: The value of <Ang> must be expressed in Radian.

        :param Chamfer:
        :type Chamfer: TopoDS_Edge &
        :param E:
        :type E: TopoDS_Edge &
        :param D:
        :type D: float
        :param Ang:
        :type Ang: float
        :rtype: TopoDS_Edge

        """
        return _ChFi2d.ChFi2d_Builder_ModifyChamfer(self, *args)

    def RemoveChamfer(self, *args):
        """
        * removes the chamfer <Chamfer> and returns the vertex connecting the two adjacent edges to this chamfer.

        :param Chamfer:
        :type Chamfer: TopoDS_Edge &
        :rtype: TopoDS_Vertex

        """
        return _ChFi2d.ChFi2d_Builder_RemoveChamfer(self, *args)

    def Result(self):
        """
        * returns the modified face

        :rtype: TopoDS_Face

        """
        return _ChFi2d.ChFi2d_Builder_Result(self)

    def IsModified(self, *args):
        """
        :param E:
        :type E: TopoDS_Edge &
        :rtype: bool

        """
        return _ChFi2d.ChFi2d_Builder_IsModified(self, *args)

    def FilletEdges(self):
        """
        * returns the list of new edges

        :rtype: TopTools_SequenceOfShape

        """
        return _ChFi2d.ChFi2d_Builder_FilletEdges(self)

    def NbFillet(self):
        """
        :rtype: int

        """
        return _ChFi2d.ChFi2d_Builder_NbFillet(self)

    def ChamferEdges(self):
        """
        * returns the list of new edges

        :rtype: TopTools_SequenceOfShape

        """
        return _ChFi2d.ChFi2d_Builder_ChamferEdges(self)

    def NbChamfer(self):
        """
        :rtype: int

        """
        return _ChFi2d.ChFi2d_Builder_NbChamfer(self)

    def HasDescendant(self, *args):
        """
        :param E:
        :type E: TopoDS_Edge &
        :rtype: bool

        """
        return _ChFi2d.ChFi2d_Builder_HasDescendant(self, *args)

    def DescendantEdge(self, *args):
        """
        * returns the modified edge if <E> has descendant or <E> in the other case.

        :param E:
        :type E: TopoDS_Edge &
        :rtype: TopoDS_Edge

        """
        return _ChFi2d.ChFi2d_Builder_DescendantEdge(self, *args)

    def BasisEdge(self, *args):
        """
        * Returns the parent edge of <E> Warning: If <E>is a basis edge, the returned edge would be equal to <E>

        :param E:
        :type E: TopoDS_Edge &
        :rtype: TopoDS_Edge

        """
        return _ChFi2d.ChFi2d_Builder_BasisEdge(self, *args)

    def Status(self):
        """
        :rtype: ChFi2d_ConstructionError

        """
        return _ChFi2d.ChFi2d_Builder_Status(self)

    def __del__(self):
    	try:
    		self.thisown = False
    		GarbageCollector.garbage.collect_object(self)
    	except:
    		pass


ChFi2d_Builder.Init = new_instancemethod(_ChFi2d.ChFi2d_Builder_Init,None,ChFi2d_Builder)
ChFi2d_Builder.AddFillet = new_instancemethod(_ChFi2d.ChFi2d_Builder_AddFillet,None,ChFi2d_Builder)
ChFi2d_Builder.ModifyFillet = new_instancemethod(_ChFi2d.ChFi2d_Builder_ModifyFillet,None,ChFi2d_Builder)
ChFi2d_Builder.RemoveFillet = new_instancemethod(_ChFi2d.ChFi2d_Builder_RemoveFillet,None,ChFi2d_Builder)
ChFi2d_Builder.AddChamfer = new_instancemethod(_ChFi2d.ChFi2d_Builder_AddChamfer,None,ChFi2d_Builder)
ChFi2d_Builder.ModifyChamfer = new_instancemethod(_ChFi2d.ChFi2d_Builder_ModifyChamfer,None,ChFi2d_Builder)
ChFi2d_Builder.RemoveChamfer = new_instancemethod(_ChFi2d.ChFi2d_Builder_RemoveChamfer,None,ChFi2d_Builder)
ChFi2d_Builder.Result = new_instancemethod(_ChFi2d.ChFi2d_Builder_Result,None,ChFi2d_Builder)
ChFi2d_Builder.IsModified = new_instancemethod(_ChFi2d.ChFi2d_Builder_IsModified,None,ChFi2d_Builder)
ChFi2d_Builder.FilletEdges = new_instancemethod(_ChFi2d.ChFi2d_Builder_FilletEdges,None,ChFi2d_Builder)
ChFi2d_Builder.NbFillet = new_instancemethod(_ChFi2d.ChFi2d_Builder_NbFillet,None,ChFi2d_Builder)
ChFi2d_Builder.ChamferEdges = new_instancemethod(_ChFi2d.ChFi2d_Builder_ChamferEdges,None,ChFi2d_Builder)
ChFi2d_Builder.NbChamfer = new_instancemethod(_ChFi2d.ChFi2d_Builder_NbChamfer,None,ChFi2d_Builder)
ChFi2d_Builder.HasDescendant = new_instancemethod(_ChFi2d.ChFi2d_Builder_HasDescendant,None,ChFi2d_Builder)
ChFi2d_Builder.DescendantEdge = new_instancemethod(_ChFi2d.ChFi2d_Builder_DescendantEdge,None,ChFi2d_Builder)
ChFi2d_Builder.BasisEdge = new_instancemethod(_ChFi2d.ChFi2d_Builder_BasisEdge,None,ChFi2d_Builder)
ChFi2d_Builder.Status = new_instancemethod(_ChFi2d.ChFi2d_Builder_Status,None,ChFi2d_Builder)
ChFi2d_Builder._kill_pointed = new_instancemethod(_ChFi2d.ChFi2d_Builder__kill_pointed,None,ChFi2d_Builder)
ChFi2d_Builder_swigregister = _ChFi2d.ChFi2d_Builder_swigregister
ChFi2d_Builder_swigregister(ChFi2d_Builder)

class ChFi2d_ChamferAPI(object):
    thisown = _swig_property(lambda x: x.this.own(), lambda x, v: x.this.own(v), doc='The membership flag')
    __repr__ = _swig_repr
    def __init__(self, *args): 
        """
        * An empty constructor.

        :rtype: None

        * A constructor accepting a wire consisting of two linear edges.

        :param theWire:
        :type theWire: TopoDS_Wire &
        :rtype: None

        * A constructor accepting two linear edges.

        :param theEdge1:
        :type theEdge1: TopoDS_Edge &
        :param theEdge2:
        :type theEdge2: TopoDS_Edge &
        :rtype: None

        """
        _ChFi2d.ChFi2d_ChamferAPI_swiginit(self,_ChFi2d.new_ChFi2d_ChamferAPI(*args))
    def Init(self, *args):
        """
        * Initializes the class by a wire consisting of two libear edges.

        :param theWire:
        :type theWire: TopoDS_Wire &
        :rtype: None

        * Initializes the class by two linear edges.

        :param theEdge1:
        :type theEdge1: TopoDS_Edge &
        :param theEdge2:
        :type theEdge2: TopoDS_Edge &
        :rtype: None

        """
        return _ChFi2d.ChFi2d_ChamferAPI_Init(self, *args)

    def Perform(self):
        """
        * Constructs a chamfer edge. Returns true if the edge is constructed.

        :rtype: bool

        """
        return _ChFi2d.ChFi2d_ChamferAPI_Perform(self)

    def Result(self, *args):
        """
        :param theEdge1:
        :type theEdge1: TopoDS_Edge &
        :param theEdge2:
        :type theEdge2: TopoDS_Edge &
        :param theLength1:
        :type theLength1: float
        :param theLength2:
        :type theLength2: float
        :rtype: TopoDS_Edge

        """
        return _ChFi2d.ChFi2d_ChamferAPI_Result(self, *args)

    def __del__(self):
    	try:
    		self.thisown = False
    		GarbageCollector.garbage.collect_object(self)
    	except:
    		pass


ChFi2d_ChamferAPI.Init = new_instancemethod(_ChFi2d.ChFi2d_ChamferAPI_Init,None,ChFi2d_ChamferAPI)
ChFi2d_ChamferAPI.Perform = new_instancemethod(_ChFi2d.ChFi2d_ChamferAPI_Perform,None,ChFi2d_ChamferAPI)
ChFi2d_ChamferAPI.Result = new_instancemethod(_ChFi2d.ChFi2d_ChamferAPI_Result,None,ChFi2d_ChamferAPI)
ChFi2d_ChamferAPI._kill_pointed = new_instancemethod(_ChFi2d.ChFi2d_ChamferAPI__kill_pointed,None,ChFi2d_ChamferAPI)
ChFi2d_ChamferAPI_swigregister = _ChFi2d.ChFi2d_ChamferAPI_swigregister
ChFi2d_ChamferAPI_swigregister(ChFi2d_ChamferAPI)

class ChFi2d_FilletAPI(object):
    thisown = _swig_property(lambda x: x.this.own(), lambda x, v: x.this.own(v), doc='The membership flag')
    __repr__ = _swig_repr
    def __init__(self, *args): 
        """
        * An empty constructor of the fillet algorithm. Call a method Init() to initialize the algorithm before calling of a Perform() method.

        :rtype: None

        * A constructor of a fillet algorithm: accepts a wire consisting of two edges in a plane.

        :param theWire:
        :type theWire: TopoDS_Wire &
        :param thePlane:
        :type thePlane: gp_Pln
        :rtype: None

        * A constructor of a fillet algorithm: accepts two edges in a plane.

        :param theEdge1:
        :type theEdge1: TopoDS_Edge &
        :param theEdge2:
        :type theEdge2: TopoDS_Edge &
        :param thePlane:
        :type thePlane: gp_Pln
        :rtype: None

        """
        _ChFi2d.ChFi2d_FilletAPI_swiginit(self,_ChFi2d.new_ChFi2d_FilletAPI(*args))
    def Init(self, *args):
        """
        * Initializes a fillet algorithm: accepts a wire consisting of two edges in a plane.

        :param theWire:
        :type theWire: TopoDS_Wire &
        :param thePlane:
        :type thePlane: gp_Pln
        :rtype: None

        * Initializes a fillet algorithm: accepts two edges in a plane.

        :param theEdge1:
        :type theEdge1: TopoDS_Edge &
        :param theEdge2:
        :type theEdge2: TopoDS_Edge &
        :param thePlane:
        :type thePlane: gp_Pln
        :rtype: None

        """
        return _ChFi2d.ChFi2d_FilletAPI_Init(self, *args)

    def Perform(self, *args):
        """
        * Constructs a fillet edge. Returns true if at least one result was found.

        :param theRadius:
        :type theRadius: float
        :rtype: bool

        """
        return _ChFi2d.ChFi2d_FilletAPI_Perform(self, *args)

    def NbResults(self, *args):
        """
        * Returns number of possible solutions. <thePoint> chooses a particular fillet in case of several fillets may be constructed (for example, a circle intersecting a segment in 2 points). Put the intersecting (or common) point of the edges.

        :param thePoint:
        :type thePoint: gp_Pnt
        :rtype: int

        """
        return _ChFi2d.ChFi2d_FilletAPI_NbResults(self, *args)

    def Result(self, *args):
        """
        * Returns result (fillet edge, modified edge1, modified edge2), nearest to the given point <thePoint> if iSolution == -1 <thePoint> chooses a particular fillet in case of several fillets may be constructed (for example, a circle intersecting a segment in 2 points). Put the intersecting (or common) point of the edges.

        :param thePoint:
        :type thePoint: gp_Pnt
        :param theEdge1:
        :type theEdge1: TopoDS_Edge &
        :param theEdge2:
        :type theEdge2: TopoDS_Edge &
        :param iSolution: default value is - 1
        :type iSolution: Standard_Integer
        :rtype: TopoDS_Edge

        * Returns result (fillet edge, modified edge1, modified edge2), nearest to the given point <thePoint> if iSolution == -1 <thePoint> chooses a particular fillet in case of several fillets may be constructed (for example, a circle intersecting a segment in 2 points). Put the intersecting (or common) point of the edges.

        :param thePoint:
        :type thePoint: gp_Pnt
        :param theEdge1:
        :type theEdge1: TopoDS_Edge &
        :param theEdge2:
        :type theEdge2: TopoDS_Edge &
        :param iSolution: default value is - 1
        :type iSolution: Standard_Integer
        :rtype: TopoDS_Edge

        """
        return _ChFi2d.ChFi2d_FilletAPI_Result(self, *args)

    def __del__(self):
    	try:
    		self.thisown = False
    		GarbageCollector.garbage.collect_object(self)
    	except:
    		pass


ChFi2d_FilletAPI.Init = new_instancemethod(_ChFi2d.ChFi2d_FilletAPI_Init,None,ChFi2d_FilletAPI)
ChFi2d_FilletAPI.Perform = new_instancemethod(_ChFi2d.ChFi2d_FilletAPI_Perform,None,ChFi2d_FilletAPI)
ChFi2d_FilletAPI.NbResults = new_instancemethod(_ChFi2d.ChFi2d_FilletAPI_NbResults,None,ChFi2d_FilletAPI)
ChFi2d_FilletAPI.Result = new_instancemethod(_ChFi2d.ChFi2d_FilletAPI_Result,None,ChFi2d_FilletAPI)
ChFi2d_FilletAPI._kill_pointed = new_instancemethod(_ChFi2d.ChFi2d_FilletAPI__kill_pointed,None,ChFi2d_FilletAPI)
ChFi2d_FilletAPI_swigregister = _ChFi2d.ChFi2d_FilletAPI_swigregister
ChFi2d_FilletAPI_swigregister(ChFi2d_FilletAPI)

class ChFi2d_FilletAlgo(object):
    thisown = _swig_property(lambda x: x.this.own(), lambda x, v: x.this.own(v), doc='The membership flag')
    __repr__ = _swig_repr
    def __init__(self, *args): 
        """
        * An empty constructor of the fillet algorithm. Call a method Init() to initialize the algorithm before calling of a Perform() method.

        :rtype: None

        * A constructor of a fillet algorithm: accepts a wire consisting of two edges in a plane.

        :param theWire:
        :type theWire: TopoDS_Wire &
        :param thePlane:
        :type thePlane: gp_Pln
        :rtype: None

        * A constructor of a fillet algorithm: accepts two edges in a plane.

        :param theEdge1:
        :type theEdge1: TopoDS_Edge &
        :param theEdge2:
        :type theEdge2: TopoDS_Edge &
        :param thePlane:
        :type thePlane: gp_Pln
        :rtype: None

        """
        _ChFi2d.ChFi2d_FilletAlgo_swiginit(self,_ChFi2d.new_ChFi2d_FilletAlgo(*args))
    def Init(self, *args):
        """
        * Initializes a fillet algorithm: accepts a wire consisting of two edges in a plane.

        :param theWire:
        :type theWire: TopoDS_Wire &
        :param thePlane:
        :type thePlane: gp_Pln
        :rtype: None

        * Initializes a fillet algorithm: accepts two edges in a plane.

        :param theEdge1:
        :type theEdge1: TopoDS_Edge &
        :param theEdge2:
        :type theEdge2: TopoDS_Edge &
        :param thePlane:
        :type thePlane: gp_Pln
        :rtype: None

        """
        return _ChFi2d.ChFi2d_FilletAlgo_Init(self, *args)

    def Perform(self, *args):
        """
        * Constructs a fillet edge. Returns true, if at least one result was found

        :param theRadius:
        :type theRadius: float
        :rtype: bool

        """
        return _ChFi2d.ChFi2d_FilletAlgo_Perform(self, *args)

    def NbResults(self, *args):
        """
        * Returns number of possible solutions. <thePoint> chooses a particular fillet in case of several fillets may be constructed (for example, a circle intersecting a segment in 2 points). Put the intersecting (or common) point of the edges.

        :param thePoint:
        :type thePoint: gp_Pnt
        :rtype: int

        """
        return _ChFi2d.ChFi2d_FilletAlgo_NbResults(self, *args)

    def Result(self, *args):
        """
        * Returns result (fillet edge, modified edge1, modified edge2), neares to the given point <thePoint> if iSolution == -1. <thePoint> chooses a particular fillet in case of several fillets may be constructed (for example, a circle intersecting a segment in 2 points). Put the intersecting (or common) point of the edges.

        :param thePoint:
        :type thePoint: gp_Pnt
        :param theEdge1:
        :type theEdge1: TopoDS_Edge &
        :param theEdge2:
        :type theEdge2: TopoDS_Edge &
        :param iSolution: default value is - 1
        :type iSolution: Standard_Integer
        :rtype: TopoDS_Edge

        * Returns result (fillet edge, modified edge1, modified edge2), neares to the given point <thePoint> if iSolution == -1. <thePoint> chooses a particular fillet in case of several fillets may be constructed (for example, a circle intersecting a segment in 2 points). Put the intersecting (or common) point of the edges.

        :param thePoint:
        :type thePoint: gp_Pnt
        :param theEdge1:
        :type theEdge1: TopoDS_Edge &
        :param theEdge2:
        :type theEdge2: TopoDS_Edge &
        :param iSolution: default value is - 1
        :type iSolution: Standard_Integer
        :rtype: TopoDS_Edge

        """
        return _ChFi2d.ChFi2d_FilletAlgo_Result(self, *args)

    def __del__(self):
    	try:
    		self.thisown = False
    		GarbageCollector.garbage.collect_object(self)
    	except:
    		pass


ChFi2d_FilletAlgo.Init = new_instancemethod(_ChFi2d.ChFi2d_FilletAlgo_Init,None,ChFi2d_FilletAlgo)
ChFi2d_FilletAlgo.Perform = new_instancemethod(_ChFi2d.ChFi2d_FilletAlgo_Perform,None,ChFi2d_FilletAlgo)
ChFi2d_FilletAlgo.NbResults = new_instancemethod(_ChFi2d.ChFi2d_FilletAlgo_NbResults,None,ChFi2d_FilletAlgo)
ChFi2d_FilletAlgo.Result = new_instancemethod(_ChFi2d.ChFi2d_FilletAlgo_Result,None,ChFi2d_FilletAlgo)
ChFi2d_FilletAlgo._kill_pointed = new_instancemethod(_ChFi2d.ChFi2d_FilletAlgo__kill_pointed,None,ChFi2d_FilletAlgo)
ChFi2d_FilletAlgo_swigregister = _ChFi2d.ChFi2d_FilletAlgo_swigregister
ChFi2d_FilletAlgo_swigregister(ChFi2d_FilletAlgo)



