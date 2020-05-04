import {Layer} from "../Layer";
import {Node} from "../../Node";
import {ActivationType} from "../../../enums/ActivationType";
import {NodeType} from "../../../enums/NodeType";
import {ConnectionType} from "../../../enums/ConnectionType";

export class DenseLayer extends Layer {
    constructor(outputSize: number, options: { activationType?: ActivationType } = {}) {
        super(outputSize);

        const activation: ActivationType = options.activationType ?? ActivationType.LogisticActivation;

        for (let i: number = 0; i < outputSize; i++) {
            this.inputNodes.add(new Node(NodeType.HIDDEN).setSquash(activation));
        }

        this.outputNodes = this.inputNodes;
        this.nodes.push(...Array.from(this.inputNodes));
    }

    public connectionTypeisAllowed(type: ConnectionType): boolean {
        return true;
    }

    public getDefaultIncomingConnectionType(): ConnectionType {
        return ConnectionType.ALL_TO_ALL;
    }
}
