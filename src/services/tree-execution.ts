/**
 * Created by larjo on 14/7/2016.
 */
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import {Store} from "@ngrx/store";

import {RudolfCubesService} from "./rudolf-cubes";
import {ExpressionNode} from "../models/expressionNode";
import {AggregateNode} from "../models/aggregate/aggregateNode";
import {ExpressionTree} from "../models/expressionTree";
import {AppState} from "../reducers/index";
import {TreeActions} from "../actions/tree";
import {Cube} from "../models/cube";
import {FuncNode} from "../models/func/funcNode";

@Injectable()
export class TreeExecution {

  constructor(private rudolfCubesService: RudolfCubesService, private store:Store<AppState>, private treeActions:TreeActions) {}

    execute(expresseionTree: ExpressionTree, rootNode:ExpressionNode){
      for (var child of rootNode.children) {
        this.execute(expresseionTree, child);
      }
      if(rootNode instanceof AggregateNode){
        this.rudolfCubesService.aggregate(rootNode.element).subscribe(response=>{
          rootNode.value = response;
          rootNode.executed = true;
          this.store.dispatch(this.treeActions.replace(expresseionTree));

        });

        /* .catch(() => Observable.of(this.cubeActions.searchComplete([]));*/
      }
      else if(rootNode instanceof FuncNode){


      }
    }

}