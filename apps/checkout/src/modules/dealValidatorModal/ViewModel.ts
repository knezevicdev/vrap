import { makeAutoObservable, runInAction } from 'mobx';
import React from 'react';

import { DealValidatorProps } from 'src/core/dealValidator';
import Login from 'src/modules/login';

export default class DealValidatorModalViewModel {
  initialData: DealValidatorProps;

  constructor(initialProps: DealValidatorProps) {
    makeAutoObservable(this);
    this.initialData = initialProps;
  }

  get isModalOpen() {
    return true;
  }

  get ModalContent() {
    return React.createFactory(Login);
  }
}
