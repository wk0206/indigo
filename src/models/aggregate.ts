import {ExpressionNode} from "./expressionNode";
/**
 * Created by larjo_000 on 27/6/2016.
 */

export class Aggregate implements Serializable<Aggregate>{
  serialize(input: Aggregate): Object {
    return this;
  }
  deserialize(input:Object):Aggregate {

    this.ref = input.ref;
    this.measure = input.measure;
    this.label = input.label;

    return this;
  }





  ref: string;

  measure:string;

  label:string;
}
