import { DealValidatorProps } from "src/core/dealValidator";
import { makeAutoObservable, runInAction } from 'mobx';
 
export default class DealValidatorModalViewModel {

  initialData: DealValidatorProps;

  constructor(initialProps: DealValidatorProps) { 
     makeAutoObservable(this);
    this.initialData = initialProps; 
  }

  get isModalOpen(){
      return true
  }

}
 