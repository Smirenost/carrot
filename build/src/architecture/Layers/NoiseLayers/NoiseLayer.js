"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoiseLayer = void 0;
var src_1 = require("activations/build/src");
var ConnectionType_1 = require("../../../enums/ConnectionType");
var NodeType_1 = require("../../../enums/NodeType");
var NoiseNode_1 = require("../../Nodes/NoiseNode");
var Layer_1 = require("../Layer");
/**
 * Noise layer
 */
var NoiseLayer = /** @class */ (function (_super) {
    __extends(NoiseLayer, _super);
    function NoiseLayer(outputSize, options) {
        var _a;
        if (options === void 0) { options = {}; }
        var _b;
        var _this = _super.call(this, outputSize) || this;
        var activation = (_b = options.activation) !== null && _b !== void 0 ? _b : src_1.Identitiy;
        for (var i = 0; i < outputSize; i++) {
            _this.inputNodes.add(new NoiseNode_1.NoiseNode({
                noiseType: NodeType_1.NoiseNodeType.GAUSSIAN_NOISE,
                gaussian: options
            }).setActivationType(activation));
        }
        _this.outputNodes = _this.inputNodes;
        (_a = _this.nodes).push.apply(_a, Array.from(_this.inputNodes));
        return _this;
    }
    /**
     * Gets the default connection type for a incoming connection to this layer.
     *
     * @returns the default incoming connection
     */
    NoiseLayer.prototype.getDefaultIncomingConnectionType = function () {
        return ConnectionType_1.ConnectionType.ONE_TO_ONE;
    };
    /**
     * Checks if a given connection type is allowed on this layer.
     *
     * @param type the type to check
     *
     * @return Is this connection type allowed?
     */
    NoiseLayer.prototype.connectionTypeisAllowed = function (type) {
        return type === ConnectionType_1.ConnectionType.ONE_TO_ONE;
    };
    return NoiseLayer;
}(Layer_1.Layer));
exports.NoiseLayer = NoiseLayer;