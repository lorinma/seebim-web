 /*
  * embeddedViewer(config)
  *   Embed a Trimble Connect viewer into your application.
  *
  * config - a dictionary with the following keys:
  *   projId          the project id (required)
  *   objects         comma separated list of storage object visible ids (required)
  *   domNode         a DOM node at which we insert the viewer (required)
  *                   Note that the contents of this DOM node will be
  *                   overwritten by the embedded viewer.
  *   accessToken     the access token required to embed this model (required)
  *   class           a CSS class that will be applied to the viewer
  *                   (optional, default no class)
  *   width           the width in pixels of the embedded viewer
  *                   (optional, default 800)
  *   height          the height in pixels of the embedded viewer
  *                   (optional, default 600)
  *   debug           if set to true, emits debugging information to console
  *                   (optional, default false)
  *   onInitialized   function that will be called when the viewer app
  *                   is displaying a model and is ready to receive
  *                   commands (optional, default undefined)
  *
  * returns an embeddedViewer object.
  */


function EmbeddedViewer(config) {

  var initializeCmd = { "name": "initialize" };

  if(config.projId){
    initializeCmd.projId = config.projId;
  } else {
    throw new Error("Error while embedding model viewer, project id must be defined.");
  }

  if (config.objects&& config.accessToken) {
    initializeCmd.objects = config.objects;
    initializeCmd.accessToken = config.accessToken;
  } else {
    throw new Error("Error while embedding model viewer: " +
      "objects and accessToken must both be defined.");
  }

  if(config.gteamOrigin){
    initializeCmd.gteamOrigin = decodeURIComponent(config.gteamOrigin);
  } else {
    throw new Error("Error while embedding model viewer: " +
    "gteamOrigin must be defined.");
  }

    initializeCmd.title = config.title || "Model";
    initializeCmd.noProperties = !!config.noProperties;
    initializeCmd.noLeft = !!config.noLeft;
    initializeCmd.showLatest = !!config.showLatest;
    var debug = config.debug === true;
    // process options object...
    if(config.options){
      initializeCmd.noProperties = initializeCmd.noProperties || (config.options && !!config.options.hideProperty);
    }
    // left panel options;
    initializeCmd.noLeft = initializeCmd.noLeft || (config.options && !!config.options.hideLeftPanel);
    if(config.options && config.options.leftPanel && !initializeCmd.noLeft){
      if(config.options.leftPanel.view){
        initializeCmd.hideView = !!config.options.leftPanel.hideView;
        if(!initializeCmd.hideView){
          initializeCmd.hideCreateView = !!config.options.leftPanel.view.hideCreateView;
          initializeCmd.hideUpdateView = !!config.options.leftPanel.view.hideUpdateView;
          initializeCmd.hideDeleteView = !!config.options.leftPanel.view.hideDeleteView;
        }
      }
      initializeCmd.hideModelTree = !!config.options.leftPanel.hideModelTree;
      if(config.options.leftPanel.clash){
        initializeCmd.hideClash = !!config.options.leftPanel.hideClash;
        if(!initializeCmd.hideClash){
          initializeCmd.hideCreateClash = !!config.options.leftPanel.clash.hideCreateClash;
          initializeCmd.hideDeleteClash = !!config.options.leftPanel.clash.hideDeleteClash;
        }
      }
      initializeCmd.hideReport = !!config.options.leftPanel.hideReport;
      if(config.options.leftPanel.report && !initializeCmd.hideReport){
          initializeCmd.hideCustomReport = !!config.options.leftPanel.report.hideCustomReport;
      }
    }
    // toolbar..
    initializeCmd.hideToolbar = config.options && !!config.options.hideToolbar;
    if(config.options && config.options.toolbar && !initializeCmd.hideToolbar){
      if(!initializeCmd.hideToolbar){
        initializeCmd.hideDownload = !!config.options.toolbar.hideDownload;
        initializeCmd.hideNavigation = !!config.options.toolbar.hideNavigation;
        initializeCmd.hidePresetView = !!config.options.toolbar.hidePresetView;
        initializeCmd.hideZoomSelect = !!config.options.toolbar.hideZoomSelect;
        initializeCmd.hideTool = !!config.options.toolbar.hideTool;
        initializeCmd.hideMarkup = !!config.options.toolbar.hideMarkup;
        initializeCmd.hideReset = !!config.options.toolbar.hideReset;
      }
    }
    var onInitialized = config.onInitialized || function() {};
    this.onSelectionChanged=config.onSelectionChanged || function() {};
    var domNode = config.domNode;
    if (!domNode) {
      throw new Error("Error while embedding model viewer: " +
          "domNode must be defined and must not be null.");
    }

    var el = document.createElement("iframe");
    el.setAttribute("frameborder", 0);
    el.setAttribute("id", "gteamEmbeddedApp_viewer");
    if (typeof config["class"] !== "undefined") {
        el.setAttribute("class", config["class"]);
    }
    el.setAttribute("width", config.width || '100%');
    el.setAttribute("height", config.height || '100%');
    el.setAttribute("allowfullscreen", "true");
    el.setAttribute("mozallowfullscreen", "true");
    el.setAttribute("webkitallowfullscreen", "true");
    var gteamOrigin = initializeCmd.gteamOrigin;
    var allowedOrigin = location.protocol + "//" + location.host;
    var embedUrl = gteamOrigin + "/tc/app/embedviewer?id="+ initializeCmd.projId + "&objects=" + initializeCmd.objects
     + "&allowedOrigin=" + encodeURIComponent(allowedOrigin)
     +"&accessToken=" + initializeCmd.accessToken;
    if(config.viewId) embedUrl += "&viewId=" + config.viewId;
    ["noLeft","noProperties","showLatest","hideView","hideCreateView",
     "hideUpdateView","hideDeleteView","hideClash","hideCreateClash","hideDeleteClash",
     "hideReport","hideCustomReport","hideToolbar","hideDownload","hideNavigation","hidePresetView",
     "hideZoomSelect","hideTool","hideMarkup","hideReset","hideModelTree","showLatest"].forEach(function(option){
      if(initializeCmd[option]) embedUrl = embedUrl + "&" + option + "=" + initializeCmd[option];
    });
    el.setAttribute("src", embedUrl);
    // domNode.innerHTML = "";
    domNode.append(el);

    var callbackId = 0;
    var callbacks = {};

    var STATE_NOT_READY = "not_ready";
    var STATE_READY = "ready";
    var state = STATE_NOT_READY;
    var messageSource = el.contentWindow;

    var sendMessage = this._sendMessage = function(command, callback) {
        if (state === STATE_NOT_READY) {
            throw new Error("Model viewer is not ready to accept commands.");
        }
        var msg = {"cmd": command, "v": "BSQ1"};
        if (typeof callback !== "undefined" && callback) {
            callbacks[callbackId] = callback;
            msg["i"] = callbackId;
            callbackId++;
        }
        messageSource.postMessage(JSON.stringify(msg), gteamOrigin);
    };

    var self = this;

    function onReceiveMessage(event) {
        if (event.origin !== gteamOrigin) {
            if (debug && window.console && window.console.warn) {
                console.warn("ignoring message from origin",
                    event.origin);
                console.warn("we're configured to only accept messages " +
                    "from origin", gteamOrigin);
            }
            return;
        }

        try {
            var d = JSON.parse(event.data);
        } catch (e) {
            if (debug && window.console && window.console.warn) {
                console.warn("incoming message could not be parsed as JSON.", event.data);
            }
            return;
        }

        if (d.v !== "BSQ1") {
            if (debug && window.console && window.console.warn) {
                console.warn("incoming message ignored; protocol version " +
                    "was", d.v, "expected version BSQ1");
            }
            return;
        }

        if (d.cmd === "viewer_ready") {
            onReady();
        } else if (d.Selected && typeof(self.onSelectionChanged) === 'function') {
          self.onSelectionChanged({'ids':d.Selected});
        } else if (typeof d.i !== "undefined") {
            var callback = callbacks[d.i];
            delete callbacks[d.i];
            callback(d.data);
        }
    }

    function onReady() {
        if (debug && window.console && window.console.log) {
            console.log("received onReady message, sending " +
                "initialize request");
        }
        var frame = document.getElementById("gteamEmbeddedApp_viewer");
        if(frame){
          messageSource = frame.contentWindow;
        }
        state = STATE_READY;
        onInitialized();
    }

    if (window.addEventListener) { // W3C DOM
        window.addEventListener("message", onReceiveMessage);
    } else if (el.attachEvent) { // IE DOM
        el.attachEvent("onmessage", onReceiveMessage);
    } else {
        throw new Error("could not attach on-message event listener");
    }
}

var methods = {
    "setMaterial": ["vids", "material", "recursive"],
    "setColor": ["vids", "material", "recursive"],
    "highlight": ["vids", "recursive"],
    "hide": ["vids"],
    "show": ["vids"],
    "showAll": [],
    "setSelection": ["vids", "recursive"],
    "addToSelection": ["vids", "recursive"],
    "removeFromSelection": ["vids", "recursive"],
    "showType": ["type"],
    "hideType": ["type"],
    "getTypes": ["callback"],
    "reset": [],
    "zoom": ["vids"],
    "getSelected": ["callback"],
    "getProperties": ["id", "callback"],
    "selectByName" : ["iName","recursive"],
    "getObjectCount" : ["callback"],
    "getObjectsRange" : ["from","to","callback"],
    "getFOV" : ["callback"],
    "getCameraDir" : ["callback"],
    "getCameraLoc" : ["callback"],
    "getCameraUpVect" : ["callback"],
    "setFOV" : ["fov"],
    "setCameraDir" : ["dir"],
    "setCameraLoc" : ["loc"],
    "getGTeamID" : ["ids","fileVids","callback"], // fileVids should always be objects from the "objects" in the embedding data; bu it could be null, empty array, or return value from getFileVersionId..
    "getSourceID" : ["ids","callback"],
    "getFileVersionId" : ["id","callback"],
    'createTodo' : ['todoData','callback'],
    // var todoData = {name: "name",dueDate : 'dueDate', assignees : [], description : 'description', label : 'label'} may also incoude priorityDTO, status....
    'createSnapshot' : ['snapshotData','callback']  // snapshotData = {name: 'name', description : 'description'}
};

for (var method_name in methods) {
    if (methods.hasOwnProperty(method_name)) {
        EmbeddedViewer.prototype[method_name] =  (function(method_name) {
            return function() {
              var required_arguments = methods[method_name];
                if (arguments.length !== required_arguments.length) {
                    throw new Error("Invalid number of arguments, given: " + arguments.length
                                    + ", required: " + required_arguments.length);
                };
                var message = {"name": method_name};
                var callback = null;
                for (var i = 0; i < required_arguments.length; i++) {
                    message[required_arguments[i]] = arguments[i];
                    if (required_arguments[i] === "callback") {
                        callback = arguments[i];
                    };
                };
                this._sendMessage(message, callback);
            };
        })(method_name);
    };
};
