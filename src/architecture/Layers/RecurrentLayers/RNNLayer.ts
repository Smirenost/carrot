import {ActivationType, Logistic} from "activations/build/src";
import {ConnectionType} from "../../../enums/ConnectionType";
import {NodeType} from "../../../enums/NodeType";
import {Node} from "../../Node";
import {Layer} from "../Layer";

/**
 * RNN layer
 */
export class RNNLayer extends Layer {
    constructor(outputSize: number, options: {
        /**
         * The activation type for the output nodes of this layer.
         */
        activation?: ActivationType
    } = {}) {
        super(outputSize);

        for (let i: number = 0; i < outputSize; i++) {
            this.inputNodes.add(new Node(NodeType.HIDDEN).setActivationType(options.activation ?? Logistic));
        }

        this.outputNodes = this.inputNodes;
        this.nodes.push(...Array.from(this.inputNodes));

        // Adding self connections
        this.connections.push(...Layer.connect(this.nodes, this.nodes, ConnectionType.ONE_TO_ONE));
    }

    /**
     * Checks if a given connection type is allowed on this layer.
     *
     * @param type the type to check
     *
     * @return Is this connection type allowed?
     */
    public connectionTypeisAllowed(type: ConnectionType): boolean {
        return true;
    }

    /**
     * Gets the default connection type for a incoming connection to this layer.
     *
     * @returns the default incoming connection
     */
    public getDefaultIncomingConnectionType(): ConnectionType {
        return ConnectionType.ALL_TO_ALL;
    }
}