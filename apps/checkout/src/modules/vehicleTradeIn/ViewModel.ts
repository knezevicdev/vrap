import Model from './Model';

export default class VehicleTradeInViewModel {
  model: Model;

  constructor(model: Model) {
    this.model = model; 
  }
  get dealId() {
    if(this.model.dataStatus === 2){
      return this.model.data.user && this.model.data?.user?.deals && this.model.data?.user?.deals[0]?.dealID + "  <=Deal ID";
    }
  }
}
