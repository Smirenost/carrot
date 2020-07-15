"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
// tslint:disable-next-line:no-any
var mnist = require("mnist");
var chai_1 = require("chai");
var Network_1 = require("../../src/architecture/Network");
var EvolveOptions_1 = require("../../src/interfaces/EvolveOptions");
var Mutation_1 = require("../../src/methods/Mutation");
describe('MNIST', function () {
    it("evolve mnist", function () {
        return __awaiter(this, void 0, void 0, function () {
            var set, trainingSet, net, errorBefore, options, errorAfter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(0);
                        set = mnist.set(2000, 0);
                        trainingSet = set.training;
                        net = new Network_1.Network(trainingSet[0].input.length, trainingSet[0].output.length);
                        errorBefore = net.test(trainingSet);
                        options = new EvolveOptions_1.EvolveOptions();
                        options.dataset = trainingSet;
                        options.populationSize = 50;
                        options.mutations = Mutation_1.FEEDFORWARD_MUTATIONS;
                        options.mutationAmount = 2;
                        options.mutationRate = 0.4;
                        options.iterations = 10;
                        return [4 /*yield*/, net.evolve(options)];
                    case 1:
                        _a.sent();
                        errorAfter = net.test(trainingSet);
                        chai_1.expect(Number.isFinite(errorAfter)).to.be.true;
                        chai_1.expect(errorAfter).to.be.at.most(errorBefore);
                        return [2 /*return*/];
                }
            });
        });
    });
});