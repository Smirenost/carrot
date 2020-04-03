// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"architecture/layer/Layer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
}); // TODO: actually implement it

var Layer =
/** @class */
function () {
  function Layer(inputSize, outputSize) {
    this.inputSize = inputSize;
    this.outputSize = outputSize;
    this.nodes = [];
    this.connections = [];
  }

  return Layer;
}();

exports.Layer = Layer;
},{}],"architecture/layer/ConvolutionLayer.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Layer_1 = require("./Layer"); // TODO: actually implement it


var ConvolutionLayer =
/** @class */
function (_super) {
  __extends(ConvolutionLayer, _super);

  function ConvolutionLayer(inputSize, outputSize) {
    return _super.call(this, inputSize, outputSize) || this;
  }

  return ConvolutionLayer;
}(Layer_1.Layer);

exports.ConvolutionLayer = ConvolutionLayer;
},{"./Layer":"architecture/layer/Layer.js"}],"methods/Activation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Activation =
/** @class */
function () {
  function Activation() {
    this.type = ActivationType.NO_ACTIVATION;
  }

  Activation.getActivation = function (activationType) {
    switch (activationType) {
      case ActivationType.LogisticActivation:
        return new LogisticActivation();

      case ActivationType.TanhActivation:
        return new TanhActivation();

      case ActivationType.IdentityActivation:
        return new IdentityActivation();

      case ActivationType.StepActivation:
        return new StepActivation();

      case ActivationType.RELUActivation:
        return new RELUActivation();

      case ActivationType.SoftsignActivation:
        return new SoftsignActivation();

      case ActivationType.SinusoidActivation:
        return new LogisticActivation();

      case ActivationType.GaussianActivation:
        return new GaussianActivation();

      case ActivationType.BentIdentityActivation:
        return new BentIdentityActivation();

      case ActivationType.BipolarActivation:
        return new BipolarActivation();

      case ActivationType.BipolarSigmoidActivation:
        return new BipolarSigmoidActivation();

      case ActivationType.HardTanhActivation:
        return new HardTanhActivation();

      case ActivationType.AbsoluteActivation:
        return new AbsoluteActivation();

      case ActivationType.InverseActivation:
        return new InverseActivation();

      case ActivationType.SELUActivation:
        return new SELUActivation();
    }

    throw new ReferenceError(activationType + " is not the name of any available activations! These are all available activations: " + exports.ALL_ACTIVATIONS);
  };

  return Activation;
}();

exports.Activation = Activation;

var LogisticActivation =
/** @class */
function () {
  function LogisticActivation() {
    this.type = ActivationType.LogisticActivation;
  }

  LogisticActivation.prototype.calc = function (x, derivative) {
    if (derivative === void 0) {
      derivative = false;
    }

    if (!derivative) {
      return 1 / (1 + Math.exp(-x));
    } else {
      return this.calc(x, false) * (1 - this.calc(x, false));
    }
  };

  return LogisticActivation;
}();

exports.LogisticActivation = LogisticActivation;

var TanhActivation =
/** @class */
function () {
  function TanhActivation() {
    this.type = ActivationType.TanhActivation;
  }

  TanhActivation.prototype.calc = function (x, derivative) {
    if (derivative === void 0) {
      derivative = false;
    }

    if (!derivative) {
      return Math.tanh(x);
    } else {
      return 1 - this.calc(x, false) * this.calc(x, false);
    }
  };

  return TanhActivation;
}();

exports.TanhActivation = TanhActivation;

var IdentityActivation =
/** @class */
function () {
  function IdentityActivation() {
    this.type = ActivationType.IdentityActivation;
  }

  IdentityActivation.prototype.calc = function (x, derivative) {
    if (derivative === void 0) {
      derivative = false;
    }

    if (!derivative) {
      return x;
    } else {
      return 1;
    }
  };

  return IdentityActivation;
}();

exports.IdentityActivation = IdentityActivation;

var StepActivation =
/** @class */
function () {
  function StepActivation() {
    this.type = ActivationType.StepActivation;
  }

  StepActivation.prototype.calc = function (x, derivative) {
    if (derivative === void 0) {
      derivative = false;
    }

    if (!derivative) {
      return x < 0 ? 0 : 1;
    } else {
      return 0;
    }
  };

  return StepActivation;
}();

exports.StepActivation = StepActivation;

var RELUActivation =
/** @class */
function () {
  function RELUActivation() {
    this.type = ActivationType.RELUActivation;
  }

  RELUActivation.prototype.calc = function (x, derivative) {
    if (derivative === void 0) {
      derivative = false;
    }

    if (!derivative) {
      return x <= 0 ? 0 : x;
    } else {
      return x <= 0 ? 0 : 1;
    }
  };

  return RELUActivation;
}();

exports.RELUActivation = RELUActivation;

var SoftsignActivation =
/** @class */
function () {
  function SoftsignActivation() {
    this.type = ActivationType.SoftsignActivation;
  }

  SoftsignActivation.prototype.calc = function (x, derivative) {
    if (derivative === void 0) {
      derivative = false;
    }

    if (!derivative) {
      return x / (1 + Math.abs(x));
    } else {
      return x / ((1 + Math.abs(x)) * (1 + Math.abs(x)));
    }
  };

  return SoftsignActivation;
}();

exports.SoftsignActivation = SoftsignActivation;

var SinusoidActivation =
/** @class */
function () {
  function SinusoidActivation() {
    this.type = ActivationType.SinusoidActivation;
  }

  SinusoidActivation.prototype.calc = function (x, derivative) {
    if (derivative === void 0) {
      derivative = false;
    }

    if (!derivative) {
      return Math.sin(x);
    } else {
      return Math.cos(x);
    }
  };

  return SinusoidActivation;
}();

exports.SinusoidActivation = SinusoidActivation;

var GaussianActivation =
/** @class */
function () {
  function GaussianActivation() {
    this.type = ActivationType.GaussianActivation;
  }

  GaussianActivation.prototype.calc = function (x, derivative) {
    if (derivative === void 0) {
      derivative = false;
    }

    if (!derivative) {
      return Math.exp(-x * x);
    } else {
      return -2 * x * this.calc(x, false);
    }
  };

  return GaussianActivation;
}();

exports.GaussianActivation = GaussianActivation;

var BentIdentityActivation =
/** @class */
function () {
  function BentIdentityActivation() {
    this.type = ActivationType.BentIdentityActivation;
  }

  BentIdentityActivation.prototype.calc = function (x, derivative) {
    if (derivative === void 0) {
      derivative = false;
    }

    if (!derivative) {
      return (Math.sqrt(x * x + 1) - 1) / 2 + x;
    } else {
      return x / (2 * Math.sqrt(x * x + 1)) + 1;
    }
  };

  return BentIdentityActivation;
}();

exports.BentIdentityActivation = BentIdentityActivation;

var BipolarActivation =
/** @class */
function () {
  function BipolarActivation() {
    this.type = ActivationType.BipolarActivation;
  }

  BipolarActivation.prototype.calc = function (x, derivative) {
    if (derivative === void 0) {
      derivative = false;
    }

    if (!derivative) {
      return x > 0 ? 1 : -1;
    } else {
      return 0;
    }
  };

  return BipolarActivation;
}();

exports.BipolarActivation = BipolarActivation;

var BipolarSigmoidActivation =
/** @class */
function () {
  function BipolarSigmoidActivation() {
    this.type = ActivationType.BipolarSigmoidActivation;
  }

  BipolarSigmoidActivation.prototype.calc = function (x, derivative) {
    if (derivative === void 0) {
      derivative = false;
    }

    if (!derivative) {
      return 2 / (1 + Math.exp(-x)) - 1;
    } else {
      return 2 * Math.exp(-x) / ((1 + Math.exp(-x)) * (1 + Math.exp(-x)));
    }
  };

  return BipolarSigmoidActivation;
}();

exports.BipolarSigmoidActivation = BipolarSigmoidActivation;

var HardTanhActivation =
/** @class */
function () {
  function HardTanhActivation() {
    this.type = ActivationType.HardTanhActivation;
  }

  HardTanhActivation.prototype.calc = function (x, derivative) {
    if (derivative === void 0) {
      derivative = false;
    }

    if (!derivative) {
      return Math.max(-1, Math.min(1, x));
    } else {
      return Math.abs(x) < 1 ? 1 : 0;
    }
  };

  return HardTanhActivation;
}();

exports.HardTanhActivation = HardTanhActivation;

var AbsoluteActivation =
/** @class */
function () {
  function AbsoluteActivation() {
    this.type = ActivationType.AbsoluteActivation;
  }

  AbsoluteActivation.prototype.calc = function (x, derivative) {
    if (derivative === void 0) {
      derivative = false;
    }

    if (!derivative) {
      return Math.abs(x);
    } else {
      return x < 0 ? -1 : 1;
    }
  };

  return AbsoluteActivation;
}();

exports.AbsoluteActivation = AbsoluteActivation;

var InverseActivation =
/** @class */
function () {
  function InverseActivation() {
    this.type = ActivationType.InverseActivation;
  }

  InverseActivation.prototype.calc = function (x, derivative) {
    if (derivative === void 0) {
      derivative = false;
    }

    if (!derivative) {
      return 1 - x;
    } else {
      return -1;
    }
  };

  return InverseActivation;
}();

exports.InverseActivation = InverseActivation;

var SELUActivation =
/** @class */
function () {
  function SELUActivation() {
    this.type = ActivationType.SELUActivation;
  }

  SELUActivation.prototype.calc = function (x, derivative) {
    if (derivative === void 0) {
      derivative = false;
    }

    var alpha = 1.6732632423543772848170429916717;
    var scale = 1.0507009873554804934193349852946;

    if (!derivative) {
      if (x > 0) {
        return x * scale;
      } else {
        return alpha * Math.exp(x) - alpha * scale;
      }
    } else if (x > 0) {
      return scale;
    } else {
      return alpha * Math.exp(x) * scale;
    }
  };

  return SELUActivation;
}();

exports.SELUActivation = SELUActivation;
var ActivationType;

(function (ActivationType) {
  ActivationType[ActivationType["NO_ACTIVATION"] = 0] = "NO_ACTIVATION";
  ActivationType[ActivationType["LogisticActivation"] = 1] = "LogisticActivation";
  ActivationType[ActivationType["TanhActivation"] = 2] = "TanhActivation";
  ActivationType[ActivationType["IdentityActivation"] = 3] = "IdentityActivation";
  ActivationType[ActivationType["StepActivation"] = 4] = "StepActivation";
  ActivationType[ActivationType["RELUActivation"] = 5] = "RELUActivation";
  ActivationType[ActivationType["SoftsignActivation"] = 6] = "SoftsignActivation";
  ActivationType[ActivationType["SinusoidActivation"] = 7] = "SinusoidActivation";
  ActivationType[ActivationType["GaussianActivation"] = 8] = "GaussianActivation";
  ActivationType[ActivationType["BentIdentityActivation"] = 9] = "BentIdentityActivation";
  ActivationType[ActivationType["BipolarActivation"] = 10] = "BipolarActivation";
  ActivationType[ActivationType["BipolarSigmoidActivation"] = 11] = "BipolarSigmoidActivation";
  ActivationType[ActivationType["HardTanhActivation"] = 12] = "HardTanhActivation";
  ActivationType[ActivationType["AbsoluteActivation"] = 13] = "AbsoluteActivation";
  ActivationType[ActivationType["InverseActivation"] = 14] = "InverseActivation";
  ActivationType[ActivationType["SELUActivation"] = 15] = "SELUActivation";
})(ActivationType = exports.ActivationType || (exports.ActivationType = {}));

exports.ALL_ACTIVATIONS = [ActivationType.LogisticActivation, ActivationType.TanhActivation, ActivationType.IdentityActivation, ActivationType.StepActivation, ActivationType.RELUActivation, ActivationType.SoftsignActivation, ActivationType.SinusoidActivation, ActivationType.GaussianActivation, ActivationType.BentIdentityActivation, ActivationType.BipolarActivation, ActivationType.BipolarSigmoidActivation, ActivationType.HardTanhActivation, ActivationType.AbsoluteActivation, ActivationType.InverseActivation, ActivationType.SELUActivation];
},{}],"architecture/Connection.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Connection =
/** @class */
function () {
  function Connection(from, to, weight, gateNode) {
    this.from = from;
    this.to = to;
    this.weight = weight || 0;
    this.gain = 1;
    this.eligibility = 0;
    this.deltaWeightsPrevious = 0;
    this.deltaWeightsTotal = 0;
    this.xTraceNodes = [];
    this.xTraceValues = [];

    if (gateNode) {
      this.gateNode = gateNode;
      gateNode.addGate(this);
    } else {
      this.gateNode = null;
    }
  }

  Connection.innovationID = function (a, b) {
    return 1 / 2 * (a + b) * (a + b + 1) + b;
  };

  Connection.prototype.toJSON = function () {
    return {
      fromIndex: this.from.index,
      toIndex: this.to.index,
      gateNodeIndex: this.gateNode === null ? null : this.gateNode.index,
      weight: this.weight
    };
  };

  return Connection;
}();

exports.Connection = Connection;
},{}],"methods/Utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function pickRandom(arr) {
  return arr[randInt(0, arr.length)];
}

exports.pickRandom = pickRandom;

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

exports.randInt = randInt;

function randDouble(min, max) {
  return Math.random() * (max - min) + min;
}

exports.randDouble = randDouble;

function randBoolean() {
  return Math.random() >= 0.5;
}

exports.randBoolean = randBoolean;

function anyMatch(arr, target) {
  for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
    var elem = arr_1[_i];

    if (elem === target) {
      return true;
    }
  }

  return false;
}

exports.anyMatch = anyMatch;

function remove(arr, elem) {
  var index = arr.indexOf(elem);

  if (index === -1) {
    return false;
  } else {
    arr.splice(index, 1);
    return true;
  }
}

exports.remove = remove;

function getOrDefault(value, defaultValue) {
  return value !== undefined && value !== null ? value : defaultValue;
}

exports.getOrDefault = getOrDefault;

function shuffle(array) {
  var counter = array.length; // While there are elements in the array

  while (counter > 0) {
    // Pick a random index
    var index = randInt(0, counter); // Decrease counter by 1

    counter--; // And swap the last element with it

    var temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

exports.shuffle = shuffle;
},{}],"architecture/Node.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Activation_1 = require("../methods/Activation");

var Connection_1 = require("./Connection");

var Utils_1 = require("../methods/Utils");

var Node =
/** @class */
function () {
  function Node(type) {
    if (type === void 0) {
      type = NodeType.HIDDEN;
    }

    this.type = type;
    this.bias = Utils_1.randDouble(-1, 1);
    this.squash = new Activation_1.LogisticActivation();
    this.activation = 0;
    this.state = 0;
    this.old = 0;
    this.mask = 1;
    this.deltaBiasPrevious = 0;
    this.deltaBiasTotal = 0;
    this.incoming = [];
    this.outgoing = [];
    this.gated = [];
    this.selfConnection = new Connection_1.Connection(this, this, 0);
    this.errorResponsibility = 0;
    this.errorProjected = 0;
    this.errorGated = 0;
    this.index = NaN;
  }

  Node.fromJSON = function (json) {
    var node = new Node();
    node.bias = json.bias;
    node.type = json.type;
    node.squash = Activation_1.Activation.getActivation(json.squash);
    node.mask = json.mask;
    node.index = json.index;
    return node;
  };

  Node.prototype.clear = function () {
    for (var _i = 0, _a = this.incoming; _i < _a.length; _i++) {
      var connection = _a[_i];
      connection.eligibility = 0;
      connection.xTraceNodes = [];
      connection.xTraceValues = [];
    }

    for (var _b = 0, _c = this.gated; _b < _c.length; _b++) {
      var connection = _c[_b];
      connection.gain = 0;
    }

    this.errorResponsibility = this.errorProjected = this.errorGated = 0;
    this.old = this.state = this.activation = 0;
  };

  Node.prototype.mutateBias = function (method) {
    this.bias += Utils_1.randDouble(method.min, method.max);
  };

  Node.prototype.mutateActivation = function () {
    var newActivationType;

    do {
      newActivationType = Utils_1.pickRandom(Activation_1.ALL_ACTIVATIONS);
    } while (newActivationType === this.squash.type);

    this.squash = Activation_1.Activation.getActivation(newActivationType);
  };

  Node.prototype.isProjectedBy = function (node) {
    if (node === this) {
      return this.selfConnection.weight !== 0;
    } else {
      return Utils_1.anyMatch(this.incoming.map(function (conn) {
        return conn.from;
      }), node);
    }
  };

  Node.prototype.isProjectingTo = function (node) {
    if (node === this) {
      return this.selfConnection.weight !== 0;
    } else {
      return Utils_1.anyMatch(this.outgoing.map(function (conn) {
        return conn.to;
      }), node);
    }
  };

  Node.prototype.addGate = function (connection) {
    this.gated.push(connection);
    connection.gateNode = this;
  };

  Node.prototype.removeGate = function (connection) {
    Utils_1.remove(this.gated, connection);
    connection.gateNode = null;
    connection.gain = 1;
  };

  Node.prototype.connect = function (target, weight, twoSided) {
    if (weight === void 0) {
      weight = 0;
    }

    if (twoSided === void 0) {
      twoSided = false;
    }

    if (target === this) {
      this.selfConnection.weight = weight || 1;
      return this.selfConnection;
    } else if (this.isProjectingTo(target)) {
      throw new ReferenceError();
    } else {
      var connection = new Connection_1.Connection(this, target, weight);
      this.outgoing.push(connection);
      target.incoming.push(connection);

      if (twoSided) {
        target.connect(this);
      }

      return connection;
    }
  };

  Node.prototype.disconnect = function (node, twoSided) {
    if (twoSided === void 0) {
      twoSided = false;
    }

    if (node === this) {
      this.selfConnection.weight = 0;
      return this.selfConnection;
    }

    for (var _i = 0, _a = this.outgoing; _i < _a.length; _i++) {
      var connection = _a[_i];

      if (connection.to !== node) {
        continue;
      }

      Utils_1.remove(this.outgoing, connection);
      Utils_1.remove(connection.to.incoming, connection);

      if (connection.gateNode !== undefined && connection.gateNode != null) {
        connection.gateNode.removeGate(connection);
      }

      if (twoSided) {
        node.disconnect(this);
      }

      return connection;
    }

    throw new Error("No connection found!");
  };

  Node.prototype.propagate = function (target, momentum, rate, update) {
    if (target !== undefined && Number.isFinite(target)) {
      this.errorResponsibility = this.errorProjected = target - this.activation;
    } else {
      this.errorProjected = 0;

      for (var _i = 0, _a = this.outgoing; _i < _a.length; _i++) {
        var connection = _a[_i];
        this.errorProjected += connection.to.errorResponsibility * connection.weight * connection.gain;
      }

      this.errorProjected *= this.derivative || 1;
      this.errorGated = 0;

      for (var _b = 0, _c = this.gated; _b < _c.length; _b++) {
        var connection = _c[_b];
        var node = connection.to;
        var influence = void 0;

        if (node.selfConnection.gateNode === this) {
          influence = node.old + connection.weight * connection.from.activation;
        } else {
          influence = connection.weight * connection.from.activation;
        }

        this.errorGated += node.errorResponsibility * influence;
      }

      this.errorGated *= this.derivative || 1;
      this.errorResponsibility = this.errorProjected + this.errorGated;
    }

    for (var _d = 0, _e = this.incoming; _d < _e.length; _d++) {
      var connection = _e[_d];
      var gradient = this.errorProjected * connection.eligibility;

      for (var j = 0; j < connection.xTraceNodes.length; j++) {
        var node = connection.xTraceNodes[j];
        gradient += node.errorResponsibility * connection.xTraceValues[j];
      }

      connection.deltaWeightsTotal += rate * gradient * this.mask;

      if (update) {
        connection.deltaWeightsTotal += momentum * connection.deltaWeightsPrevious;
        connection.weight += connection.deltaWeightsTotal;
        connection.deltaWeightsPrevious = connection.deltaWeightsTotal;
        connection.deltaWeightsTotal = 0;
      }
    }

    this.deltaBiasTotal += rate * this.errorResponsibility;

    if (update) {
      this.deltaBiasTotal += momentum * this.deltaBiasPrevious;
      this.bias += this.deltaBiasTotal;
      this.deltaBiasPrevious = this.deltaBiasTotal;
      this.deltaBiasTotal = 0;
    }

    return {
      responsibility: this.errorResponsibility,
      projected: this.errorProjected,
      gated: this.errorGated
    };
  };

  Node.prototype.activate = function (input, trace) {
    var _this = this;

    if (input === void 0) {
      input = null;
    }

    if (trace === void 0) {
      trace = true;
    } // TODO: check for errors


    if (input !== null && Number.isFinite(input)) {
      return this.activation = input;
    }

    if (trace) {
      this.old = this.state;
      this.state = this.selfConnection.gain * this.selfConnection.weight * this.state + this.bias;
      this.incoming.forEach(function (conn) {
        _this.state += conn.from.activation * conn.weight * conn.gain;
      });
      this.activation = this.squash.calc(this.state, false) * this.mask;
      this.derivative = this.squash.calc(this.state, true);
      var nodes_1 = [];
      var influences_1 = [];
      this.gated.forEach(function (connection) {
        connection.gain = _this.activation;
        var index = nodes_1.indexOf(connection.to);

        if (index > -1) {
          influences_1[index] += connection.weight * connection.from.activation;
        } else {
          nodes_1.push(connection.to);

          if (connection.to.selfConnection.gateNode === _this) {
            influences_1.push(connection.weight * connection.from.activation + connection.to.old);
          } else {
            influences_1.push(connection.weight * connection.from.activation);
          }
        }
      });

      for (var _i = 0, _a = this.incoming; _i < _a.length; _i++) {
        var connection = _a[_i];
        connection.eligibility = this.selfConnection.gain * this.selfConnection.weight * connection.eligibility + connection.from.activation * connection.gain;

        for (var i = 0; i < nodes_1.length; i++) {
          var node = nodes_1[i];
          var influence = influences_1[i];
          var index = connection.xTraceNodes.indexOf(node);
          if (index > -1) connection.xTraceValues[index] = node.selfConnection.gain * node.selfConnection.weight * connection.xTraceValues[index] + this.derivative * connection.eligibility * influence;else {
            connection.xTraceNodes.push(node);
            connection.xTraceValues.push(this.derivative * connection.eligibility * influence);
          }
        }
      }

      return this.activation;
    } else {
      if (this.isInputNode()) return this.activation = 0;
      this.state = this.selfConnection.gain * this.selfConnection.weight * this.state + this.bias;

      for (var _b = 0, _c = this.incoming; _b < _c.length; _b++) {
        var connection = _c[_b];
        this.state += connection.from.activation * connection.weight * connection.gain;
      }

      this.activation = this.squash.calc(this.state, false);

      for (var _d = 0, _e = this.gated; _d < _e.length; _d++) {
        var connection = _e[_d];
        connection.gain = this.activation;
      }

      return this.activation;
    }
  };

  Node.prototype.toJSON = function () {
    return {
      bias: this.bias,
      type: this.type,
      squash: this.squash.type,
      mask: this.mask,
      index: this.index
    };
  };

  Node.prototype.isInputNode = function () {
    return this.type === NodeType.INPUT;
  };

  Node.prototype.isHiddenNode = function () {
    return this.type === NodeType.HIDDEN;
  };

  Node.prototype.isOutputNode = function () {
    return this.type === NodeType.OUTPUT;
  };

  return Node;
}();

exports.Node = Node;
var NodeType;

(function (NodeType) {
  NodeType[NodeType["INPUT"] = 0] = "INPUT";
  NodeType[NodeType["HIDDEN"] = 1] = "HIDDEN";
  NodeType[NodeType["OUTPUT"] = 2] = "OUTPUT";
})(NodeType = exports.NodeType || (exports.NodeType = {}));
},{"../methods/Activation":"methods/Activation.js","./Connection":"architecture/Connection.js","../methods/Utils":"methods/Utils.js"}],"architecture/layer/DenseLayer.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Layer_1 = require("./Layer");

var Node_1 = require("../Node"); // TODO: actually implement it


var DenseLayer =
/** @class */
function (_super) {
  __extends(DenseLayer, _super);

  function DenseLayer(inputSize, outputSize) {
    var _this = _super.call(this, inputSize, outputSize) || this;

    for (var i = 0; i < inputSize; i++) {
      _this.nodes.push(new Node_1.Node(Node_1.NodeType.INPUT));
    }

    for (var i = 0; i < outputSize; i++) {
      _this.nodes.push(new Node_1.Node(Node_1.NodeType.INPUT));
    }

    _this.nodes.filter(function (node) {
      return node.isInputNode();
    }).forEach(function (inputNode) {
      _this.nodes.filter(function (node) {
        return node.isOutputNode();
      }).forEach(function (outputNode) {
        _this.connections.push(inputNode.connect(outputNode, 1));
      });
    });

    return _this;
  }

  return DenseLayer;
}(Layer_1.Layer);

exports.DenseLayer = DenseLayer;
},{"./Layer":"architecture/layer/Layer.js","../Node":"architecture/Node.js"}],"architecture/layer/GaussianNoiseLayer.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Layer_1 = require("./Layer"); // TODO: actually implement it


var GaussianNoiseLayer =
/** @class */
function (_super) {
  __extends(GaussianNoiseLayer, _super);

  function GaussianNoiseLayer(inputSize, outputSize) {
    return _super.call(this, inputSize, outputSize) || this;
  }

  return GaussianNoiseLayer;
}(Layer_1.Layer);

exports.GaussianNoiseLayer = GaussianNoiseLayer;
},{"./Layer":"architecture/layer/Layer.js"}],"architecture/layer/InputLayer.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Layer_1 = require("./Layer"); // TODO: actually implement it


var InputLayer =
/** @class */
function (_super) {
  __extends(InputLayer, _super);

  function InputLayer(inputSize, outputSize) {
    return _super.call(this, inputSize, outputSize) || this;
  }

  return InputLayer;
}(Layer_1.Layer);

exports.InputLayer = InputLayer;
},{"./Layer":"architecture/layer/Layer.js"}],"architecture/layer/LSTMLayer.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Layer_1 = require("./Layer"); // TODO: actually implement it


var LSTMLayer =
/** @class */
function (_super) {
  __extends(LSTMLayer, _super);

  function LSTMLayer(inputSize, outputSize) {
    return _super.call(this, inputSize, outputSize) || this;
  }

  return LSTMLayer;
}(Layer_1.Layer);

exports.LSTMLayer = LSTMLayer;
},{"./Layer":"architecture/layer/Layer.js"}],"architecture/layer/PoolLayer.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Layer_1 = require("./Layer"); // TODO: actually implement it


var PoolLayer =
/** @class */
function (_super) {
  __extends(PoolLayer, _super);

  function PoolLayer(inputSize, outputSize, type) {
    return _super.call(this, inputSize, outputSize) || this;
  }

  return PoolLayer;
}(Layer_1.Layer);

exports.PoolLayer = PoolLayer;
var PoolingType;

(function (PoolingType) {
  PoolingType[PoolingType["MaxPooling"] = 0] = "MaxPooling";
  PoolingType[PoolingType["AveragePooling"] = 1] = "AveragePooling";
  PoolingType[PoolingType["GlobalPooling"] = 2] = "GlobalPooling";
})(PoolingType = exports.PoolingType || (exports.PoolingType = {}));
},{"./Layer":"architecture/layer/Layer.js"}],"architecture/layer/RNNLayer.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Layer_1 = require("./Layer"); // TODO: actually implement it


var RNNLayer =
/** @class */
function (_super) {
  __extends(RNNLayer, _super);

  function RNNLayer(inputSize, outputSize) {
    return _super.call(this, inputSize, outputSize) || this;
  }

  return RNNLayer;
}(Layer_1.Layer);

exports.RNNLayer = RNNLayer;
},{"./Layer":"architecture/layer/Layer.js"}],"architecture/Architect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
}); // TODO: actually implement it

var Architect =
/** @class */
function () {
  function Architect() {
    this.layers = [];
  }

  Architect.prototype.addLayer = function (layer) {
    if (this.layers[this.layers.length - 1].outputSize !== layer.inputSize) {
      throw new RangeError("Output size of last layer is unequal input size of this layer! " + this.layers[this.layers.length - 1].outputSize + " -> " + layer.inputSize);
    }

    this.layers.push(layer);
    return this;
  };

  return Architect;
}();

exports.Architect = Architect;
},{}],"methods/Mutation.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Node_1 = require("../architecture/Node");

var Utils_1 = require("./Utils");

var Mutation =
/** @class */
function () {
  function Mutation() {}

  return Mutation;
}();

exports.Mutation = Mutation;

var AddNodeMutation =
/** @class */
function (_super) {
  __extends(AddNodeMutation, _super);

  function AddNodeMutation(randomActivation) {
    if (randomActivation === void 0) {
      randomActivation = true;
    }

    var _this = _super.call(this) || this;

    _this.randomActivation = randomActivation;
    return _this;
  }

  AddNodeMutation.prototype.mutate = function (genome, maxNodes) {
    if (maxNodes !== undefined && genome.nodes.length >= maxNodes) {
      return;
    }

    var node = new Node_1.Node(Node_1.NodeType.HIDDEN);

    if (this.randomActivation) {
      node.mutateActivation();
    }

    var connection = Utils_1.pickRandom(genome.connections);
    var from = connection.from;
    var to = connection.to;
    genome.disconnect(from, to);
    var minBound = Math.max(genome.inputSize, 1 + genome.nodes.indexOf(from));
    genome.nodes.splice(minBound, 0, node);
    var newConnection1 = genome.connect(from, node, 1);
    var newConnection2 = genome.connect(node, to, connection.weight);

    if (connection.gateNode != null) {
      if (Utils_1.randBoolean()) {
        genome.addGate(connection.gateNode, newConnection1);
      } else {
        genome.addGate(connection.gateNode, newConnection2);
      }
    }
  };

  return AddNodeMutation;
}(Mutation);

exports.AddNodeMutation = AddNodeMutation;

var SubNodeMutation =
/** @class */
function (_super) {
  __extends(SubNodeMutation, _super);

  function SubNodeMutation(keepGates) {
    if (keepGates === void 0) {
      keepGates = true;
    }

    var _this = _super.call(this) || this;

    _this.keepGates = keepGates;
    return _this;
  }

  SubNodeMutation.prototype.mutate = function (genome) {
    var possible = genome.nodes.filter(function (node) {
      return node !== undefined && node.isHiddenNode();
    });

    if (possible.length > 0) {
      var node = Utils_1.pickRandom(possible);
      genome.removeNode(node);
    }
  };

  return SubNodeMutation;
}(Mutation);

exports.SubNodeMutation = SubNodeMutation;

var AddConnectionMutation =
/** @class */
function (_super) {
  __extends(AddConnectionMutation, _super);

  function AddConnectionMutation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  AddConnectionMutation.prototype.mutate = function (genome, maxConnections) {
    if (maxConnections !== undefined && maxConnections <= genome.connections.length) {
      return;
    }

    var possible = [];

    for (var i = 0; i < genome.nodes.length - genome.outputSize; i++) {
      var from = genome.nodes[i];

      for (var j = Math.max(i + 1, genome.inputSize); j < genome.nodes.length; j++) {
        var to = genome.nodes[j];

        if (!from.isProjectingTo(to)) {
          possible.push([from, to]);
        }
      }
    }

    if (possible.length > 0) {
      var pair = Utils_1.pickRandom(possible);
      genome.connect(pair[0], pair[1]);
    }
  };

  return AddConnectionMutation;
}(Mutation);

exports.AddConnectionMutation = AddConnectionMutation;

var SubConnectionMutation =
/** @class */
function (_super) {
  __extends(SubConnectionMutation, _super);

  function SubConnectionMutation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  SubConnectionMutation.prototype.mutate = function (genome) {
    var possible = genome.connections.filter(function (conn) {
      return conn.from.outgoing.length > 1 && conn.to.incoming.length > 1 && genome.nodes.indexOf(conn.to) > genome.nodes.indexOf(conn.from);
    });

    if (possible.length > 0) {
      var randomConnection = Utils_1.pickRandom(possible);
      genome.disconnect(randomConnection.from, randomConnection.to);
    }
  };

  return SubConnectionMutation;
}(Mutation);

exports.SubConnectionMutation = SubConnectionMutation;

var ModWeightMutation =
/** @class */
function (_super) {
  __extends(ModWeightMutation, _super);

  function ModWeightMutation(min, max) {
    if (min === void 0) {
      min = -1;
    }

    if (max === void 0) {
      max = 1;
    }

    var _this = _super.call(this) || this;

    _this.min = min;
    _this.max = max;
    return _this;
  }

  ModWeightMutation.prototype.mutate = function (genome) {
    Utils_1.pickRandom(genome.connections).weight += Utils_1.randDouble(this.min, this.max);
  };

  return ModWeightMutation;
}(Mutation);

exports.ModWeightMutation = ModWeightMutation;

var ModBiasMutation =
/** @class */
function (_super) {
  __extends(ModBiasMutation, _super);

  function ModBiasMutation(min, max) {
    if (min === void 0) {
      min = -1;
    }

    if (max === void 0) {
      max = 1;
    }

    var _this = _super.call(this) || this;

    _this.min = min;
    _this.max = max;
    return _this;
  }

  ModBiasMutation.prototype.mutate = function (genome) {
    Utils_1.pickRandom(genome.nodes.filter(function (node) {
      return !node.isInputNode();
    })).mutateBias(this);
  };

  return ModBiasMutation;
}(Mutation);

exports.ModBiasMutation = ModBiasMutation;

var ModActivationMutation =
/** @class */
function (_super) {
  __extends(ModActivationMutation, _super);

  function ModActivationMutation(mutateOutput) {
    if (mutateOutput === void 0) {
      mutateOutput = false;
    }

    var _this = _super.call(this) || this;

    _this.mutateOutput = mutateOutput;
    return _this;
  }

  ModActivationMutation.prototype.mutate = function (genome, max) {
    var possible = this.mutateOutput ? genome.nodes.filter(function (node) {
      return !node.isInputNode();
    }) : genome.nodes.filter(function (node) {
      return node.isHiddenNode();
    });

    if (possible.length > 0) {
      Utils_1.pickRandom(possible).mutateActivation();
    }
  };

  return ModActivationMutation;
}(Mutation);

exports.ModActivationMutation = ModActivationMutation;

var AddSelfConnectionMutation =
/** @class */
function (_super) {
  __extends(AddSelfConnectionMutation, _super);

  function AddSelfConnectionMutation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  AddSelfConnectionMutation.prototype.mutate = function (genome) {
    var possible = genome.nodes.filter(function (node) {
      return !node.isInputNode();
    }).filter(function (node) {
      return node.selfConnection.weight === 0;
    });

    if (possible.length > 0) {
      var node = Utils_1.pickRandom(possible);
      genome.connect(node, node);
    }
  };

  return AddSelfConnectionMutation;
}(Mutation);

exports.AddSelfConnectionMutation = AddSelfConnectionMutation;

var SubSelfConnectionMutation =
/** @class */
function (_super) {
  __extends(SubSelfConnectionMutation, _super);

  function SubSelfConnectionMutation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  SubSelfConnectionMutation.prototype.mutate = function (genome) {
    var possible = genome.connections.filter(function (conn) {
      return conn.from === conn.to;
    });

    if (possible.length > 0) {
      var randomConnection = Utils_1.pickRandom(possible);
      genome.disconnect(randomConnection.from, randomConnection.to);
    }
  };

  return SubSelfConnectionMutation;
}(Mutation);

exports.SubSelfConnectionMutation = SubSelfConnectionMutation;

var AddGateMutation =
/** @class */
function (_super) {
  __extends(AddGateMutation, _super);

  function AddGateMutation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  AddGateMutation.prototype.mutate = function (genome, maxGates) {
    if (maxGates !== undefined && maxGates <= genome.gates.length) {
      return;
    }

    var possible = genome.connections.filter(function (conn) {
      return conn.gateNode === null;
    });

    if (possible.length > 0) {
      var node = Utils_1.pickRandom(genome.nodes.filter(function (node) {
        return !node.isInputNode();
      }));
      var connection = Utils_1.pickRandom(possible);
      genome.addGate(node, connection);
    }
  };

  return AddGateMutation;
}(Mutation);

exports.AddGateMutation = AddGateMutation;

var SubGateMutation =
/** @class */
function (_super) {
  __extends(SubGateMutation, _super);

  function SubGateMutation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  SubGateMutation.prototype.mutate = function (genome) {
    if (genome.gates.length > 0) {
      genome.removeGate(Utils_1.pickRandom(genome.gates));
    }
  };

  return SubGateMutation;
}(Mutation);

exports.SubGateMutation = SubGateMutation;

var AddBackConnectionMutation =
/** @class */
function (_super) {
  __extends(AddBackConnectionMutation, _super);

  function AddBackConnectionMutation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  AddBackConnectionMutation.prototype.mutate = function (genome) {
    var possible = [];

    for (var i = genome.inputSize; i < genome.nodes.length; i++) {
      var from = genome.nodes[i];

      for (var j = genome.inputSize; j < i; j++) {
        var to = genome.nodes[j];

        if (!from.isProjectingTo(to)) {
          possible.push([from, to]);
        }
      }
    }

    if (possible.length > 0) {
      var pair = Utils_1.pickRandom(possible);
      genome.connect(pair[0], pair[1]);
    }
  };

  return AddBackConnectionMutation;
}(Mutation);

exports.AddBackConnectionMutation = AddBackConnectionMutation;

var SubBackConnectionMutation =
/** @class */
function (_super) {
  __extends(SubBackConnectionMutation, _super);

  function SubBackConnectionMutation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  SubBackConnectionMutation.prototype.mutate = function (genome) {
    var possible = genome.connections.filter(function (conn) {
      return conn.from.outgoing.length > 1;
    }).filter(function (conn) {
      return conn.to.incoming.length > 1;
    }).filter(function (conn) {
      return genome.nodes.indexOf(conn.from) > genome.nodes.indexOf(conn.to);
    });

    if (possible.length > 0) {
      var randomConnection = Utils_1.pickRandom(possible);
      genome.disconnect(randomConnection.from, randomConnection.to);
    }
  };

  return SubBackConnectionMutation;
}(Mutation);

exports.SubBackConnectionMutation = SubBackConnectionMutation;

var SwapNodesMutation =
/** @class */
function (_super) {
  __extends(SwapNodesMutation, _super);

  function SwapNodesMutation(mutateOutput) {
    if (mutateOutput === void 0) {
      mutateOutput = false;
    }

    var _this = _super.call(this) || this;

    _this.mutateOutput = mutateOutput;
    return _this;
  }

  SwapNodesMutation.prototype.mutate = function (genome) {
    var possible = this.mutateOutput ? genome.nodes.filter(function (node) {
      return node !== undefined && !node.isInputNode();
    }) : genome.nodes.filter(function (node) {
      return node !== undefined && node.isHiddenNode();
    });

    if (possible.length >= 2) {
      var node1_1 = Utils_1.pickRandom(possible);
      var node2 = Utils_1.pickRandom(possible.filter(function (node) {
        return node !== node1_1;
      }));
      var biasTemp = node1_1.bias;
      var squashTemp = node1_1.squash;
      node1_1.bias = node2.bias;
      node1_1.squash = node2.squash;
      node2.bias = biasTemp;
      node2.squash = squashTemp;
    }
  };

  return SwapNodesMutation;
}(Mutation);

exports.SwapNodesMutation = SwapNodesMutation;
exports.ALL_MUTATIONS = [new AddNodeMutation(), new SubNodeMutation(), new AddConnectionMutation(), new SubConnectionMutation(), new ModWeightMutation(), new ModBiasMutation(), new ModActivationMutation(), new AddGateMutation(), new SubGateMutation(), new AddSelfConnectionMutation(), new SubSelfConnectionMutation(), new AddBackConnectionMutation(), new SubBackConnectionMutation(), new SwapNodesMutation()];
exports.FEEDFORWARD_MUTATIONS = [new AddNodeMutation(), new SubNodeMutation(), new AddConnectionMutation(), new SubConnectionMutation(), new ModWeightMutation(), new ModBiasMutation(), new ModActivationMutation(), new SwapNodesMutation()];
},{"../architecture/Node":"architecture/Node.js","./Utils":"methods/Utils.js"}],"methods/Loss.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Loss =
/** @class */
function () {
  function Loss() {}

  return Loss;
}();

exports.Loss = Loss;

var CrossEntropyLoss =
/** @class */
function (_super) {
  __extends(CrossEntropyLoss, _super);

  function CrossEntropyLoss() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  CrossEntropyLoss.prototype.calc = function (targets, outputs) {
    var error = 0;
    outputs.forEach(function (value, index) {
      error -= targets[index] * Math.log(Math.max(value, 1e-15)) + (1 - targets[index]) * Math.log(1 - Math.max(value, 1e-15));
    });
    return error / outputs.length;
  };

  return CrossEntropyLoss;
}(Loss);

exports.CrossEntropyLoss = CrossEntropyLoss;

var MSELoss =
/** @class */
function (_super) {
  __extends(MSELoss, _super);

  function MSELoss() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MSELoss.prototype.calc = function (targets, outputs) {
    var error = 0;
    outputs.forEach(function (value, index) {
      error += Math.pow(targets[index] - value, 2);
    });
    return error / outputs.length;
  };

  return MSELoss;
}(Loss);

exports.MSELoss = MSELoss;

var BinaryLoss =
/** @class */
function (_super) {
  __extends(BinaryLoss, _super);

  function BinaryLoss() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  BinaryLoss.prototype.calc = function (targets, outputs) {
    var error = 0;
    outputs.forEach(function (value, index) {
      error += Math.round(targets[index] * 2) !== Math.round(value * 2) ? 1 : 0;
    });
    return error / outputs.length;
  };

  return BinaryLoss;
}(Loss);

exports.BinaryLoss = BinaryLoss;

var MAELoss =
/** @class */
function (_super) {
  __extends(MAELoss, _super);

  function MAELoss() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MAELoss.prototype.calc = function (targets, outputs) {
    var error = 0;
    outputs.forEach(function (value, index) {
      error += Math.abs(targets[index] - value);
    });
    return error / outputs.length;
  };

  return MAELoss;
}(Loss);

exports.MAELoss = MAELoss;

var MAPELoss =
/** @class */
function (_super) {
  __extends(MAPELoss, _super);

  function MAPELoss() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MAPELoss.prototype.calc = function (targets, outputs) {
    var error = 0;
    outputs.forEach(function (value, index) {
      error += Math.abs((value - targets[index]) / Math.max(targets[index], 1e-15));
    });
    return error / outputs.length;
  };

  return MAPELoss;
}(Loss);

exports.MAPELoss = MAPELoss;

var WAPELoss =
/** @class */
function (_super) {
  __extends(WAPELoss, _super);

  function WAPELoss() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  WAPELoss.prototype.calc = function (targets, outputs) {
    var error = 0;
    var sum = 0;

    for (var i = 0; i < outputs.length; i++) {
      error += Math.abs(targets[i] - outputs[i]);
      sum += targets[i];
    }

    return error / sum;
  };

  return WAPELoss;
}(Loss);

exports.WAPELoss = WAPELoss;

var MSLELoss =
/** @class */
function (_super) {
  __extends(MSLELoss, _super);

  function MSLELoss() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MSLELoss.prototype.calc = function (targets, outputs) {
    var error = 0;
    outputs.forEach(function (value, index) {
      error += Math.log(Math.max(targets[index], 1e-15)) - Math.log(Math.max(value, 1e-15));
    });
    return error / outputs.length;
  };

  return MSLELoss;
}(Loss);

exports.MSLELoss = MSLELoss;

var HINGELoss =
/** @class */
function (_super) {
  __extends(HINGELoss, _super);

  function HINGELoss() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  HINGELoss.prototype.calc = function (targets, outputs) {
    var error = 0;
    outputs.forEach(function (value, index) {
      error += Math.max(0, 1 - value * targets[index]);
    });
    return error / outputs.length;
  };

  return HINGELoss;
}(Loss);

exports.HINGELoss = HINGELoss;
exports.ALL_LOSSES = [new CrossEntropyLoss(), new MSELoss(), new BinaryLoss(), new MAELoss(), new MAPELoss(), new WAPELoss(), new MSLELoss(), new HINGELoss()];
},{}],"methods/Rate.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Rate =
/** @class */
function () {
  function Rate(baseRate) {
    this.baseRate = baseRate;
  }

  return Rate;
}();

exports.Rate = Rate;

var FixedRate =
/** @class */
function (_super) {
  __extends(FixedRate, _super);

  function FixedRate() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  FixedRate.prototype.calc = function (iteration) {
    return this.baseRate;
  };

  return FixedRate;
}(Rate);

exports.FixedRate = FixedRate;

var StepRate =
/** @class */
function (_super) {
  __extends(StepRate, _super);

  function StepRate(baseRate, gamma, stepSize) {
    if (gamma === void 0) {
      gamma = 0.9;
    }

    if (stepSize === void 0) {
      stepSize = 100;
    }

    var _this = _super.call(this, baseRate) || this;

    _this.gamma = gamma;
    _this.stepSize = stepSize;
    return _this;
  }

  StepRate.prototype.calc = function (iteration) {
    return this.baseRate * Math.pow(this.gamma, Math.floor(iteration / this.stepSize));
  };

  return StepRate;
}(Rate);

exports.StepRate = StepRate;

var ExponentialRate =
/** @class */
function (_super) {
  __extends(ExponentialRate, _super);

  function ExponentialRate(baseRate, gamma) {
    if (gamma === void 0) {
      gamma = 0.999;
    }

    var _this = _super.call(this, baseRate) || this;

    _this.gamma = gamma;
    return _this;
  }

  ExponentialRate.prototype.calc = function (iteration) {
    return this.baseRate * Math.pow(this.gamma, iteration);
  };

  return ExponentialRate;
}(Rate);

exports.ExponentialRate = ExponentialRate;

var InverseRate =
/** @class */
function (_super) {
  __extends(InverseRate, _super);

  function InverseRate(baseRate, gamma, power) {
    if (gamma === void 0) {
      gamma = 0.001;
    }

    if (power === void 0) {
      power = 2;
    }

    var _this = _super.call(this, baseRate) || this;

    _this.gamma = gamma;
    _this.power = power;
    return _this;
  }

  InverseRate.prototype.calc = function (iteration) {
    return this.baseRate * Math.pow(1 + this.gamma * iteration, -this.power);
  };

  return InverseRate;
}(Rate);

exports.InverseRate = InverseRate;
},{}],"methods/Selection.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Utils_1 = require("./Utils");

var Selection =
/** @class */
function () {
  function Selection() {}

  return Selection;
}();

exports.Selection = Selection;

var FitnessProportionateSelection =
/** @class */
function (_super) {
  __extends(FitnessProportionateSelection, _super);

  function FitnessProportionateSelection() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  FitnessProportionateSelection.prototype.select = function (population) {
    var _a;

    var totalFitness = 0;
    var minimalFitness = 0;

    for (var _i = 0, population_1 = population; _i < population_1.length; _i++) {
      var genome = population_1[_i];
      var score = genome.score;
      minimalFitness = score !== undefined && score < minimalFitness ? score : minimalFitness;
      totalFitness += score !== null && score !== void 0 ? score : 0;
    }

    minimalFitness = Math.abs(minimalFitness);
    totalFitness += minimalFitness * population.length;
    var random = Utils_1.randDouble(0, totalFitness);
    var value = 0;

    for (var _b = 0, population_2 = population; _b < population_2.length; _b++) {
      var genome = population_2[_b];
      value += ((_a = genome.score) !== null && _a !== void 0 ? _a : 0) + minimalFitness;

      if (random < value) {
        return genome;
      }
    }

    return Utils_1.pickRandom(population);
  };

  return FitnessProportionateSelection;
}(Selection);

exports.FitnessProportionateSelection = FitnessProportionateSelection;

var PowerSelection =
/** @class */
function (_super) {
  __extends(PowerSelection, _super);

  function PowerSelection(power) {
    if (power === void 0) {
      power = 4;
    }

    var _this = _super.call(this) || this;

    _this.power = power;
    return _this;
  }

  PowerSelection.prototype.select = function (population) {
    return population[Math.floor(Math.pow(Math.random(), this.power) * population.length)];
  };

  return PowerSelection;
}(Selection);

exports.PowerSelection = PowerSelection;

var TournamentSelection =
/** @class */
function (_super) {
  __extends(TournamentSelection, _super);

  function TournamentSelection(size, probability) {
    if (size === void 0) {
      size = 5;
    }

    if (probability === void 0) {
      probability = 0.5;
    }

    var _this = _super.call(this) || this;

    _this.size = size;
    _this.probability = probability;
    return _this;
  }

  TournamentSelection.prototype.select = function (population) {
    if (this.size > population.length) {
      throw new Error("Your tournament size should be lower than the population size, please change methods.selection.TOURNAMENT.size");
    } // Create a tournament


    var individuals = [];

    for (var i = 0; i < this.size; i++) {
      individuals.push(Utils_1.pickRandom(population));
    } // Sort the tournament individuals by score


    individuals.sort(function (a, b) {
      return b.score === undefined || a.score === undefined ? 0 : b.score - a.score;
    }); // Select an individual

    for (var i = 0; i < this.size; i++) {
      if (Math.random() < this.probability || i === this.size - 1) {
        return individuals[i];
      }
    }

    return Utils_1.pickRandom(population);
  };

  return TournamentSelection;
}(Selection);

exports.TournamentSelection = TournamentSelection;
},{"./Utils":"methods/Utils.js"}],"NEAT.js":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Network_1 = require("./architecture/Network");

var Utils_1 = require("./methods/Utils");

var Selection_1 = require("./methods/Selection");

var Mutation_1 = require("./methods/Mutation");

var NEAT =
/** @class */
function () {
  function NEAT(dataset, options) {
    if (options === void 0) {
      options = {};
    }

    this.dataset = dataset;
    this.generation = Utils_1.getOrDefault(options.generation, 0);
    this.input = Utils_1.getOrDefault(options.input, 1);
    this.output = Utils_1.getOrDefault(options.output, 1);
    this.equal = Utils_1.getOrDefault(options.equal, true);
    this.clear = Utils_1.getOrDefault(options.clear, false);
    this.populationSize = Utils_1.getOrDefault(options.populationSize, 50);
    this.elitism = Utils_1.getOrDefault(options.elitism, 5);
    this.provenance = Utils_1.getOrDefault(options.provenance, 0);
    this.mutationRate = Utils_1.getOrDefault(options.mutationRate, 0.4);
    this.mutationAmount = Utils_1.getOrDefault(options.mutationAmount, 1);
    this.fitnessPopulation = Utils_1.getOrDefault(options.fitnessPopulation, false);
    if (!options.fitnessFunction) throw new ReferenceError("No fitness function given");
    this.fitnessFunction = options.fitnessFunction;
    this.selection = Utils_1.getOrDefault(options.selection, new Selection_1.PowerSelection());
    this.mutations = Utils_1.getOrDefault(options.mutations, Mutation_1.FEEDFORWARD_MUTATIONS);
    this.template = Utils_1.getOrDefault(options.template, new Network_1.Network(this.input, this.output));
    this.maxNodes = Utils_1.getOrDefault(options.maxNodes, Infinity);
    this.maxConnections = Utils_1.getOrDefault(options.maxConnections, Infinity);
    this.maxGates = Utils_1.getOrDefault(options.maxGates, Infinity);
    this.population = [];
    this.createInitialPopulation();
  }

  NEAT.prototype.filterGenome = function (population, template, pickGenome, adjustGenome) {
    var filtered = __spreadArrays(population); // avoid mutations


    if (adjustGenome) {
      filtered.filter(function (genome) {
        return pickGenome(genome);
      }).forEach(function (genome, index) {
        return filtered[index] = adjustGenome(filtered[index]);
      });
    } else {
      filtered.filter(function (genome) {
        return pickGenome(genome);
      }).forEach(function (genome, index) {
        return filtered[index] = template.copy();
      });
    }

    return filtered;
  };

  NEAT.prototype.mutateRandom = function (genome, possible) {
    if (possible === void 0) {
      possible = this.mutations;
    }

    var maxNodes = this.maxNodes;
    var maxConnections = this.maxConnections;
    var maxGates = this.maxGates;
    possible = possible.filter(function (method) {
      return method.constructor.name !== Mutation_1.AddNodeMutation.constructor.name || genome.nodes.length < maxNodes || method.constructor.name !== Mutation_1.AddConnectionMutation.constructor.name || genome.connections.length < maxConnections || method.constructor.name !== Mutation_1.AddGateMutation.constructor.name || genome.gates.length < maxGates;
    });
    genome.mutate(Utils_1.pickRandom(possible));
  };

  NEAT.prototype.evolve = function (pickGenome, adjustGenome) {
    return __awaiter(this, void 0, void 0, function () {
      var elitists, i, newPopulation, i, fittest;

      var _a;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            // Check if evolve is possible
            if (this.elitism + this.provenance > this.populationSize) {
              throw new Error("Can`t evolve! Elitism + provenance exceeds population size!");
            }

            if (!(this.population[this.population.length - 1].score === undefined)) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , this.evaluate(this.dataset)];

          case 1:
            _b.sent();

            _b.label = 2;

          case 2:
            if (pickGenome) {
              this.population = this.filterGenome(this.population, this.template, pickGenome, adjustGenome);
            } // Sort in order of fitness (fittest first)


            this.sort();
            elitists = [];

            for (i = 0; i < this.elitism; i++) {
              elitists.push(this.population[i]);
            }

            newPopulation = Array(this.provenance).fill(this.template.copy()); // Breed the next individuals

            for (i = 0; i < this.populationSize - this.elitism - this.provenance; i++) {
              newPopulation.push(this.getOffspring());
            } // Replace the old population with the new population


            this.population = newPopulation; // Mutate the new population

            this.mutate(); // Add the elitists

            (_a = this.population).push.apply(_a, elitists); // evaluate the population


            return [4
            /*yield*/
            , this.evaluate(this.dataset)];

          case 3:
            // evaluate the population
            _b.sent(); // Check & adjust genomes as needed


            if (pickGenome) {
              this.population = this.filterGenome(this.population, this.template, pickGenome, adjustGenome);
            } // Sort in order of fitness (fittest first)


            this.sort();
            fittest = this.population[0].copy();
            fittest.score = this.population[0].score; // Reset the scores

            this.population.forEach(function (genome) {
              return genome.score = undefined;
            });
            this.generation++;
            return [2
            /*return*/
            , fittest];
        }
      });
    });
  };

  NEAT.prototype.getOffspring = function () {
    this.sort();
    var parent1 = this.selection.select(this.population);
    var parent2 = this.selection.select(this.population);

    if (parent1 === null || parent2 === null) {
      throw new ReferenceError("Should not be null!");
    }

    return Network_1.Network.crossOver(parent1, parent2, this.equal);
  };

  NEAT.prototype.mutate = function (method) {
    var _this = this;

    if (method) {
      // Elitist genomes should not be included
      this.population.filter(function () {
        return Math.random() <= _this.mutationRate;
      }).forEach(function (genome) {
        for (var i = 0; i < _this.mutationAmount; i++) {
          genome.mutate(method);
        }
      });
    } else {
      // Elitist genomes should not be included
      this.population.filter(function () {
        return Math.random() <= _this.mutationRate;
      }).forEach(function (genome) {
        for (var i = 0; i < _this.mutationAmount; i++) {
          _this.mutateRandom(genome, _this.mutations);
        }
      });
    }
  };

  NEAT.prototype.evaluate = function (dataset) {
    return __awaiter(this, void 0, void 0, function () {
      var _i, _a, genome;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (!this.fitnessPopulation) return [3
            /*break*/
            , 2];

            if (this.clear) {
              this.population.forEach(function (genome) {
                return genome.clear();
              });
            }

            return [4
            /*yield*/
            , this.fitnessFunction(dataset, this.population)];

          case 1:
            _b.sent();

            return [3
            /*break*/
            , 6];

          case 2:
            _i = 0, _a = this.population;
            _b.label = 3;

          case 3:
            if (!(_i < _a.length)) return [3
            /*break*/
            , 6];
            genome = _a[_i];

            if (this.clear) {
              genome.clear();
            }

            if (!this.fitnessFunction) return [3
            /*break*/
            , 5];
            return [4
            /*yield*/
            , this.fitnessFunction(dataset, [genome])];

          case 4:
            _b.sent();

            _b.label = 5;

          case 5:
            _i++;
            return [3
            /*break*/
            , 3];

          case 6:
            // Sort the population in order of fitness
            this.sort();
            return [2
            /*return*/
            , this.population[0]];
        }
      });
    });
  };

  NEAT.prototype.sort = function () {
    this.population.sort(function (a, b) {
      return a.score === undefined || b.score === undefined ? 0 : b.score - a.score;
    });
  };

  NEAT.prototype.getFittest = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!(this.population[this.population.length - 1].score === undefined)) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , this.evaluate(this.dataset)];

          case 1:
            _a.sent();

            _a.label = 2;

          case 2:
            this.sort();
            return [2
            /*return*/
            , this.population[0]];
        }
      });
    });
  };

  NEAT.prototype.getAverage = function () {
    return __awaiter(this, void 0, void 0, function () {
      var score;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!(this.population[this.population.length - 1].score === undefined)) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , this.evaluate(this.dataset)];

          case 1:
            _a.sent();

            _a.label = 2;

          case 2:
            score = 0;
            this.population.map(function (genome) {
              return genome.score;
            }).forEach(function (val) {
              return score += val !== null && val !== void 0 ? val : 0;
            });
            return [2
            /*return*/
            , score / this.population.length];
        }
      });
    });
  };

  NEAT.prototype.createInitialPopulation = function () {
    for (var i = 0; i < this.populationSize; i++) {
      this.population.push(this.template.copy());
    }
  };

  return NEAT;
}();

exports.NEAT = NEAT;
},{"./architecture/Network":"architecture/Network.js","./methods/Utils":"methods/Utils.js","./methods/Selection":"methods/Selection.js","./methods/Mutation":"methods/Mutation.js"}],"architecture/Network.js":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Connection_1 = require("./Connection");

var Node_1 = require("./Node");

var Utils_1 = require("../methods/Utils");

var Mutation_1 = require("../methods/Mutation");

var Loss_1 = require("../methods/Loss");

var Rate_1 = require("../methods/Rate");

var NEAT_1 = require("../NEAT");

var threads_1 = require("threads");

require("threads/register");

var Network =
/** @class */
function () {
  function Network(inputSize, outputSize) {
    this.inputSize = inputSize;
    this.outputSize = outputSize;
    this.nodes = [];
    this.connections = [];
    this.gates = [];
    this.score = undefined;

    for (var i = 0; i < inputSize; i++) {
      this.nodes.push(new Node_1.Node(Node_1.NodeType.INPUT));
    }

    for (var i = 0; i < outputSize; i++) {
      this.nodes.push(new Node_1.Node(Node_1.NodeType.OUTPUT));
    }

    for (var i = 0; i < this.inputSize; i++) {
      for (var j = this.inputSize; j < this.outputSize + this.inputSize; j++) {
        var weight = (Math.random() - 0.5) * this.inputSize * Math.sqrt(2 / this.inputSize);
        this.connect(this.nodes[i], this.nodes[j], weight);
      }
    }
  }

  Network.fromJSON = function (json) {
    var network = new Network(json.inputSize, json.outputSize);
    network.nodes = [];
    network.connections = [];
    json.nodes.map(function (nodeJSON) {
      return Node_1.Node.fromJSON(nodeJSON);
    }).forEach(function (node) {
      return network.nodes[node.index] = node;
    });
    json.connections.forEach(function (jsonConnection) {
      var connection = network.connect(network.nodes[jsonConnection.fromIndex], network.nodes[jsonConnection.toIndex], jsonConnection.weight);

      if (jsonConnection.gateNodeIndex != null) {
        network.addGate(network.nodes[jsonConnection.gateNodeIndex], connection);
      }
    });
    return network;
  };

  Network.crossOver = function (network1, network2, equal) {
    if (network1.inputSize !== network2.inputSize || network1.outputSize !== network2.outputSize) {
      throw new Error("Networks don`t have the same input/output size!");
    } // Initialise offspring


    var offspring = new Network(network1.inputSize, network1.outputSize);
    offspring.connections = [];
    offspring.nodes = []; // Save scores and create a copy

    var score1 = network1.score || 0;
    var score2 = network2.score || 0; // Determine offspring node size

    var offspringSize;

    if (equal || score1 === score2) {
      var max = Math.max(network1.nodes.length, network2.nodes.length);
      var min = Math.min(network1.nodes.length, network2.nodes.length);
      offspringSize = Utils_1.randInt(min, max + 1);
    } else if (score1 > score2) {
      offspringSize = network1.nodes.length;
    } else {
      offspringSize = network2.nodes.length;
    }

    var inputSize = network1.inputSize;
    var outputSize = network1.outputSize;

    for (var i = 0; i < network1.nodes.length; i++) {
      network1.nodes[i].index = i;
    }

    for (var i = 0; i < network2.nodes.length; i++) {
      network2.nodes[i].index = i;
    } // Assign nodes from parents to offspring


    for (var i = 0; i < offspringSize; i++) {
      var chosenNode = void 0;
      var chosenNodeType = null;

      if (i < inputSize) {
        chosenNodeType = Node_1.NodeType.INPUT;
        var sourceNetwork = Utils_1.randBoolean() ? network1 : network2;
        var inputNumber = -1;
        var j = -1;

        while (inputNumber < i) {
          j++;

          if (j >= sourceNetwork.nodes.length) {
            // something is wrong...
            throw RangeError('something is wrong with the size of the input');
          }

          if (sourceNetwork.nodes[j].isInputNode()) {
            inputNumber++;
          }
        }

        chosenNode = sourceNetwork.nodes[j];
      } else if (i < inputSize + outputSize) {
        // now select output nodes
        chosenNodeType = Node_1.NodeType.OUTPUT;
        var sourceNetwork = Utils_1.randBoolean() ? network1 : network2;
        var outputNumber = -1;
        var j = -1;

        while (outputNumber < i - inputSize) {
          j++;

          if (j >= sourceNetwork.nodes.length) {
            throw RangeError('something is wrong with the size of the output');
          }

          if (sourceNetwork.nodes[j].isOutputNode()) {
            outputNumber++;
          }
        }

        chosenNode = sourceNetwork.nodes[j];
      } else {
        chosenNodeType = Node_1.NodeType.HIDDEN;
        var sourceNetwork = void 0;

        if (i >= network1.nodes.length) {
          sourceNetwork = network2;
        } else if (i >= network2.nodes.length) {
          sourceNetwork = network1;
        } else {
          sourceNetwork = Utils_1.randBoolean() ? network1 : network2;
        }

        chosenNode = Utils_1.pickRandom(sourceNetwork.nodes);
      }

      var newNode = new Node_1.Node(chosenNodeType);
      newNode.bias = chosenNode.bias;
      newNode.squash = chosenNode.squash;
      offspring.nodes.push(newNode);
    } // Create arrays of connection genes


    var n1connections = [];
    var n2connections = []; // Add the connections of network 1

    network1.connections.forEach(function (connection) {
      n1connections[Connection_1.Connection.innovationID(connection.from.index, connection.to.index)] = connection.toJSON();
    }); // Add the connections of network 2

    network2.connections.forEach(function (connection) {
      n2connections[Connection_1.Connection.innovationID(connection.from.index, connection.to.index)] = connection.toJSON();
    }); // Split common conn genes from disjoint or excess conn genes

    var connections = [];
    var keys1 = Object.keys(n1connections);
    var keys2 = Object.keys(n2connections);

    for (var i = keys1.length - 1; i >= 0; i--) {
      if (n2connections[parseInt(keys1[i])] !== undefined) {
        connections.push(Utils_1.randBoolean() ? n1connections[parseInt(keys1[i])] : n2connections[parseInt(keys1[i])]);
        n2connections[parseInt(keys1[i])] = undefined;
      } else if (score1 >= score2 || equal) {
        connections.push(n1connections[parseInt(keys1[i])]);
      }
    } // Excess/disjoint gene


    if (score2 >= score1 || equal) {
      keys2.map(function (key) {
        return parseInt(key);
      }).map(function (key) {
        return n2connections[key];
      }).filter(function (conn) {
        return conn !== undefined;
      }).forEach(function (conn) {
        return connections.push(conn);
      });
    } // Add common conn genes uniformly


    connections.forEach(function (connectionJSON) {
      if (connectionJSON !== undefined && connectionJSON.toIndex < offspringSize && connectionJSON.fromIndex < offspringSize) {
        var from = offspring.nodes[connectionJSON.fromIndex];
        var to = offspring.nodes[connectionJSON.toIndex];
        var connection = offspring.connect(from, to, connectionJSON.weight);

        if (connectionJSON.gateNodeIndex !== null && connectionJSON.gateNodeIndex < offspringSize) {
          offspring.addGate(offspring.nodes[connectionJSON.gateNodeIndex], connection);
        }
      }
    });
    return offspring;
  };

  Network.prototype.copy = function () {
    return Network.fromJSON(this.toJSON());
  };

  Network.prototype.connect = function (from, to, weight) {
    if (weight === void 0) {
      weight = 0;
    }

    var connection = from.connect(to, weight);
    this.connections.push(connection);
    return connection;
  };

  Network.prototype.activate = function (input, dropoutRate, trace) {
    if (dropoutRate === void 0) {
      dropoutRate = 0;
    }

    if (trace === void 0) {
      trace = true;
    }

    var inputNodeIndex = 0;

    for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {
      var node = _a[_i];

      if (inputNodeIndex === this.inputSize) {
        break;
      }

      if (!node.isInputNode()) {
        continue;
      }

      node.activate(input[inputNodeIndex++], trace);
    }

    if (inputNodeIndex !== input.length) {
      throw Error("There are " + inputNodeIndex + " input nodes, but " + input.length + " inputs were passed");
    }

    this.nodes.filter(function (node) {
      return node.isHiddenNode();
    }).forEach(function (node) {
      if (dropoutRate) {
        node.mask = Math.random() >= dropoutRate ? 1 : 0;
      }

      node.activate(undefined, trace);
    });
    var output = [];

    for (var _b = 0, _c = this.nodes; _b < _c.length; _b++) {
      var node = _c[_b];

      if (output.length === this.outputSize) {
        break;
      }

      if (!node.isOutputNode()) {
        continue;
      }

      output.push(node.activate(undefined, trace));
    }

    if (output.length !== this.outputSize) {
      throw Error("There are " + this.outputSize + " output nodes, but " + output.length + " outputs were passed");
    }

    return output;
  };

  Network.prototype.propagate = function (rate, momentum, update, target) {
    if (target.length !== this.outputSize) {
      throw new Error("Output target length should match network output length");
    }

    var targetIndex = 0;

    for (var i = 0; targetIndex < this.outputSize; i++) {
      if (this.nodes[i].isOutputNode()) {
        this.nodes[i].propagate(target[targetIndex++], momentum, rate, update);
      }
    }

    for (var i = this.nodes.length - 1; i >= 0; i--) {
      if (this.nodes[i].isHiddenNode()) {
        this.nodes[i].propagate(undefined, rate, momentum, update);
      }
    }

    this.nodes.filter(function (node) {
      return node.isInputNode();
    }).forEach(function (node) {
      node.propagate(undefined, rate, momentum, update);
    });
  };

  Network.prototype.clear = function () {
    this.nodes.forEach(function (node) {
      return node.clear();
    });
  };

  Network.prototype.disconnect = function (from, to) {
    var _this = this;

    this.connections.filter(function (conn) {
      return conn.from === from;
    }).filter(function (conn) {
      return conn.to === to;
    }).forEach(function (conn) {
      if (conn.gateNode !== null) {
        _this.removeGate(conn);
      }

      Utils_1.remove(_this.connections, conn);
    });
    return from.disconnect(to);
  };

  Network.prototype.addGate = function (node, connection) {
    if (this.nodes.indexOf(node) === -1) {
      throw new ReferenceError("This node is not part of the network!");
    } else if (connection.gateNode != null) {
      return;
    }

    node.addGate(connection);
    this.gates.push(connection);
  };

  Network.prototype.removeGate = function (connection) {
    if (!Utils_1.anyMatch(this.gates, connection)) {
      throw new Error("This connection is not gated!");
    }

    Utils_1.remove(this.gates, connection);

    if (connection.gateNode != null) {
      connection.gateNode.removeGate(connection);
    }
  };

  Network.prototype.removeNode = function (node, keepGates) {
    var _this = this;

    if (keepGates === void 0) {
      keepGates = new Mutation_1.SubNodeMutation().keepGates;
    }

    if (!Utils_1.anyMatch(this.nodes, node)) {
      throw new ReferenceError("This node does not exist in the network!");
    }

    this.disconnect(node, node);
    var inputs = [];
    var gates = [];
    var outputs = [];

    for (var i = node.incoming.length - 1; i >= 0; i--) {
      var connection = node.incoming[i];

      if (keepGates && connection.gateNode !== null && connection.gateNode !== node) {
        gates.push(connection.gateNode);
      }

      inputs.push(connection.from);
      this.disconnect(connection.from, node);
    }

    for (var i = node.outgoing.length - 1; i >= 0; i--) {
      var connection = node.outgoing[i];

      if (keepGates && connection.gateNode !== null && connection.gateNode !== node) {
        gates.push(connection.gateNode);
      }

      outputs.push(connection.to);
      this.disconnect(node, connection.to);
    }

    var connections = [];
    inputs.forEach(function (input) {
      outputs.forEach(function (output) {
        if (!input.isProjectingTo(output)) {
          connections.push(_this.connect(input, output));
        }
      });
    });

    while (gates.length > 0 && connections.length > 0) {
      var gate = gates.shift();

      if (gate === undefined) {
        continue;
      }

      var connection = Utils_1.pickRandom(connections);
      this.addGate(gate, connection);
      Utils_1.remove(connections, connection);
    }

    for (var i = node.gated.length - 1; i >= 0; i--) {
      this.removeGate(node.gated[i]);
    }

    Utils_1.remove(this.nodes, node);
  };

  Network.prototype.mutate = function (method, maxNodes, maxConnections, maxGates) {
    if (maxNodes === void 0) {
      maxNodes = Infinity;
    }

    if (maxConnections === void 0) {
      maxConnections = Infinity;
    }

    if (maxGates === void 0) {
      maxGates = Infinity;
    }

    var _a;

    method.mutate(this, (_a = maxNodes !== null && maxNodes !== void 0 ? maxNodes : maxConnections) !== null && _a !== void 0 ? _a : maxGates);
  };

  Network.prototype.mutateRandom = function (allowedMethods, maxNodes, maxConnections, maxGates) {
    if (allowedMethods === void 0) {
      allowedMethods = Mutation_1.ALL_MUTATIONS;
    }

    if (maxNodes === void 0) {
      maxNodes = Infinity;
    }

    if (maxConnections === void 0) {
      maxConnections = Infinity;
    }

    if (maxGates === void 0) {
      maxGates = Infinity;
    }

    if (allowedMethods.length === 0) {
      return;
    }

    this.mutate(Utils_1.pickRandom(allowedMethods), maxNodes || Infinity, maxConnections || Infinity, maxGates || Infinity);
  };

  Network.prototype.train = function (dataset, options) {
    if (options === void 0) {
      options = {};
    }

    var _a;

    if (dataset[0].input.length !== this.inputSize || dataset[0].output.length !== this.outputSize) {
      throw new Error("Dataset input/output size should be same as network input/output size!");
    }

    options.iterations = Utils_1.getOrDefault(options.iterations, 100);
    options.error = Utils_1.getOrDefault(options.error, 0.05);
    options.loss = Utils_1.getOrDefault(options.loss, new Loss_1.MSELoss());
    var baseRate = Utils_1.getOrDefault(options.rate, 0.3);
    options.dropout = Utils_1.getOrDefault(options.dropout, 0);
    options.momentum = Utils_1.getOrDefault(options.momentum, 0);
    options.batchSize = Math.min(dataset.length, Utils_1.getOrDefault(options.batchSize, 1));
    options.ratePolicy = Utils_1.getOrDefault(options.ratePolicy, new Rate_1.FixedRate(baseRate));
    options.log = Utils_1.getOrDefault(options.log, NaN);
    var targetError = options.error <= 0 ? -1 : options.error;
    var start = Date.now(); // check for errors

    if (options.iterations <= 0 && options.error <= 0) {
      throw new Error("At least one of the following options must be specified: error, iterations");
    }

    var trainingSetSize;
    var trainingSet;
    var testSet;

    if (options.crossValidateTestSize && options.crossValidateTestSize > 0) {
      trainingSetSize = Math.ceil((1 - options.crossValidateTestSize) * dataset.length);
      trainingSet = dataset.slice(0, trainingSetSize);
      testSet = dataset.slice(trainingSetSize);
    } else {
      trainingSet = dataset;
      testSet = [];
    }

    var currentTrainingRate;
    var iterationCount = 0;
    var error = 1;

    while (error > targetError && (options.iterations <= 0 || iterationCount < options.iterations)) {
      iterationCount++;
      currentTrainingRate = options.ratePolicy.calc(iterationCount);
      var trainError = this.trainEpoch(trainingSet, options.batchSize, currentTrainingRate, options.momentum, options.loss, options.dropout);

      if (options.clear) {
        this.clear();
      } // Checks if cross validation is enabled


      if (options.crossValidateTestSize) {
        error = this.test(testSet, options.loss);

        if (options.clear) {
          this.clear();
        }
      } else {
        error = trainError;
      }

      if ((_a = options.shuffle) !== null && _a !== void 0 ? _a : false) {
        Utils_1.shuffle(dataset);
      }

      if (options.log > 0 && iterationCount % options.log === 0) {
        console.log("iteration number", iterationCount, "error", error, "training rate", currentTrainingRate);
      }

      if (options.schedule && iterationCount % options.schedule.iterations === 0) {
        options.schedule.function(error, iterationCount);
      }
    }

    if (options.clear) {
      this.clear();
    }

    return {
      error: error,
      iterations: iterationCount,
      time: Date.now() - start
    };
  };

  Network.prototype.trainEpoch = function (dataset, batchSize, trainingRate, momentum, loss, dropoutRate) {
    if (dropoutRate === void 0) {
      dropoutRate = 0.5;
    }

    var errorSum = 0;

    for (var i = 0; i < dataset.length; i++) {
      var input = dataset[i].input;
      var correctOutput = dataset[i].output;
      var update = (i + 1) % batchSize === 0 || i + 1 === dataset.length;
      var output = this.activate(input, dropoutRate);
      this.propagate(trainingRate, momentum, update, correctOutput);
      errorSum += loss.calc(correctOutput, output);
    }

    return errorSum / dataset.length;
  };

  Network.prototype.test = function (dataset, loss) {
    if (loss === void 0) {
      loss = new Loss_1.MSELoss();
    }

    var error = 0;

    for (var _i = 0, dataset_1 = dataset; _i < dataset_1.length; _i++) {
      var entry = dataset_1[_i];
      var input = entry.input;
      var target = entry.output;
      var output = this.activate(input, undefined, false);
      error += loss.calc(target, output);
    }

    return error / dataset.length;
  };

  Network.prototype.toJSON = function () {
    var json = {
      nodes: [],
      connections: [],
      inputSize: this.inputSize,
      outputSize: this.outputSize
    };

    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].index = i;
    }

    this.nodes.forEach(function (node) {
      json.nodes.push(node.toJSON());

      if (node.selfConnection.weight !== 0) {
        json.connections.push(node.selfConnection.toJSON());
      }
    });
    this.connections.forEach(function (conn) {
      return json.connections.push(conn.toJSON());
    });
    return json;
  };

  Network.prototype.evolve = function (dataset, options) {
    if (options === void 0) {
      options = {};
    }

    var _a, _b, _c;

    return __awaiter(this, void 0, void 0, function () {
      var targetError, start, serializedDataSet, workerPath, pool, neat, error, bestFitness, bestGenome, fittest, fitness;
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            if (dataset[0].input.length !== this.inputSize || dataset[0].output.length !== this.outputSize) {
              throw new Error("Dataset input/output size should be same as network input/output size!");
            }

            targetError = 0;

            if (typeof options.iterations === "undefined" && typeof options.error === "undefined") {
              options.iterations = 1000;
              targetError = 0.05;
            } else if (options.iterations) {
              targetError = -1;
            } else if (options.error) {
              targetError = options.error;
              options.iterations = 0;
            }

            options.growth = Utils_1.getOrDefault(options.growth, 0.0001);
            options.loss = Utils_1.getOrDefault(options.loss, new Loss_1.MSELoss());
            options.amount = Utils_1.getOrDefault(options.amount, 1);
            options.fitnessPopulation = Utils_1.getOrDefault(options.fitnessPopulation, false);
            options.maxNodes = Utils_1.getOrDefault(options.maxNodes, Infinity);
            options.maxConnections = Utils_1.getOrDefault(options.maxConnections, Infinity);
            options.maxGates = Utils_1.getOrDefault(options.maxGates, Infinity);
            start = Date.now();
            serializedDataSet = JSON.stringify(dataset);
            workerPath = "../multithreading/Worker";
            pool = options.threads ? threads_1.Pool(function () {
              return threads_1.spawn(new threads_1.Worker(workerPath));
            }, options.threads) : threads_1.Pool(function () {
              return threads_1.spawn(new threads_1.Worker(workerPath));
            });

            options.fitnessFunction = function (dataset, population) {
              return __awaiter(this, void 0, void 0, function () {
                var _loop_1, _i, population_1, genome;

                var _this = this;

                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      _loop_1 = function (genome) {
                        pool.queue(function (test) {
                          return __awaiter(_this, void 0, void 0, function () {
                            var _a;

                            var _b, _c;

                            return __generator(this, function (_d) {
                              switch (_d.label) {
                                case 0:
                                  if (genome === undefined) {
                                    return [2
                                    /*return*/
                                    ];
                                  }

                                  _a = genome;
                                  return [4
                                  /*yield*/
                                  , test(serializedDataSet, JSON.stringify(genome.toJSON()), Loss_1.ALL_LOSSES.indexOf((_b = options.loss) !== null && _b !== void 0 ? _b : new Loss_1.MSELoss()))];

                                case 1:
                                  _a.score = -_d.sent();

                                  if (genome.score === undefined) {
                                    genome.score = -Infinity;
                                    return [2
                                    /*return*/
                                    ];
                                  }

                                  genome.score -= ((_c = options.growth) !== null && _c !== void 0 ? _c : 0.0001) * (genome.nodes.length - genome.inputSize - genome.outputSize + genome.connections.length + genome.gates.length);
                                  return [2
                                  /*return*/
                                  ];
                              }
                            });
                          });
                        });
                      };

                      for (_i = 0, population_1 = population; _i < population_1.length; _i++) {
                        genome = population_1[_i];

                        _loop_1(genome);
                      }

                      return [4
                      /*yield*/
                      , pool.settled()];

                    case 1:
                      _a.sent();

                      return [2
                      /*return*/
                      ];
                  }
                });
              });
            };

            options.fitnessPopulation = true;
            options.template = this;
            options.input = this.inputSize;
            options.output = this.outputSize;
            neat = new NEAT_1.NEAT(dataset, options);
            error = -Infinity;
            bestFitness = -Infinity;
            _d.label = 1;

          case 1:
            if (!(error < -targetError && (options.iterations === 0 || neat.generation < ((_a = options.iterations) !== null && _a !== void 0 ? _a : 0)))) return [3
            /*break*/
            , 3];
            return [4
            /*yield*/
            , neat.evolve(undefined, undefined)];

          case 2:
            fittest = _d.sent();
            fitness = fittest.score === undefined ? -Infinity : fittest.score;
            error = fitness + options.growth * (fittest.nodes.length - fittest.inputSize - fittest.outputSize + fittest.connections.length + fittest.gates.length);

            if (fitness > bestFitness) {
              bestFitness = fitness;
              bestGenome = fittest;
            }

            if (((_b = options.log) !== null && _b !== void 0 ? _b : 0) > 0 && neat.generation % ((_c = options.log) !== null && _c !== void 0 ? _c : 0) === 0) {
              console.log("iteration", neat.generation, "fitness", fitness, "error", -error);
            }

            if (options.schedule && neat.generation % options.schedule.iterations === 0) {
              options.schedule.function(fitness, -error, neat.generation);
            }

            return [3
            /*break*/
            , 1];

          case 3:
            if (bestGenome !== undefined) {
              this.nodes = bestGenome.nodes;
              this.connections = bestGenome.connections;
              this.gates = bestGenome.gates;

              if (options.clear) {
                this.clear();
              }
            }

            return [4
            /*yield*/
            , pool.terminate()];

          case 4:
            _d.sent();

            return [2
            /*return*/
            , {
              error: -error,
              iterations: neat.generation,
              time: Date.now() - start
            }];
        }
      });
    });
  };

  return Network;
}();

exports.Network = Network;
},{"./Connection":"architecture/Connection.js","./Node":"architecture/Node.js","../methods/Utils":"methods/Utils.js","../methods/Mutation":"methods/Mutation.js","../methods/Loss":"methods/Loss.js","../methods/Rate":"methods/Rate.js","../NEAT":"NEAT.js"}],"index.js":[function(require,module,exports) {
"use strict";

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result["default"] = mod;
  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Layer_1 = require("./architecture/layer/Layer");

exports.Layer = Layer_1.Layer;

var ConvolutionLayer_1 = require("./architecture/layer/ConvolutionLayer");

exports.ConvolutionLayer = ConvolutionLayer_1.ConvolutionLayer;

var DenseLayer_1 = require("./architecture/layer/DenseLayer");

exports.DenseLayer = DenseLayer_1.DenseLayer;

var GaussianNoiseLayer_1 = require("./architecture/layer/GaussianNoiseLayer");

exports.GaussianNoiseLayer = GaussianNoiseLayer_1.GaussianNoiseLayer;

var InputLayer_1 = require("./architecture/layer/InputLayer");

exports.InputLayer = InputLayer_1.InputLayer;

var LSTMLayer_1 = require("./architecture/layer/LSTMLayer");

exports.LSTMLayer = LSTMLayer_1.LSTMLayer;

var PoolLayer_1 = require("./architecture/layer/PoolLayer");

exports.PoolLayer = PoolLayer_1.PoolLayer;

var RNNLayer_1 = require("./architecture/layer/RNNLayer");

exports.RNNLayer = RNNLayer_1.RNNLayer;

var Architect_1 = require("./architecture/Architect");

exports.Architect = Architect_1.Architect;

var Connection_1 = require("./architecture/Connection");

exports.Connection = Connection_1.Connection;

var Network_1 = require("./architecture/Network");

exports.Network = Network_1.Network;

var node_1 = require("./architecture/node");

exports.Node = node_1.Node;

var Activation = __importStar(require("./methods/Activation"));

exports.Activation = Activation;

var Loss = __importStar(require("./methods/Loss"));

exports.Loss = Loss;

var Mutation = __importStar(require("./methods/Mutation"));

exports.Mutation = Mutation;

var Rate = __importStar(require("./methods/Rate"));

exports.Rate = Rate;

var Selection = __importStar(require("./methods/Selection"));

exports.Selection = Selection;

var NEAT_1 = require("./NEAT");

exports.NEAT = NEAT_1.NEAT;
},{"./architecture/layer/Layer":"architecture/layer/Layer.js","./architecture/layer/ConvolutionLayer":"architecture/layer/ConvolutionLayer.js","./architecture/layer/DenseLayer":"architecture/layer/DenseLayer.js","./architecture/layer/GaussianNoiseLayer":"architecture/layer/GaussianNoiseLayer.js","./architecture/layer/InputLayer":"architecture/layer/InputLayer.js","./architecture/layer/LSTMLayer":"architecture/layer/LSTMLayer.js","./architecture/layer/PoolLayer":"architecture/layer/PoolLayer.js","./architecture/layer/RNNLayer":"architecture/layer/RNNLayer.js","./architecture/Architect":"architecture/Architect.js","./architecture/Connection":"architecture/Connection.js","./architecture/Network":"architecture/Network.js","./architecture/node":"architecture/Node.js","./methods/Activation":"methods/Activation.js","./methods/Loss":"methods/Loss.js","./methods/Mutation":"methods/Mutation.js","./methods/Rate":"methods/Rate.js","./methods/Selection":"methods/Selection.js","./NEAT":"NEAT.js"}]},{},["index.js"], "carrot")
//# sourceMappingURL=/index.js.map