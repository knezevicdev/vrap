import 'firebase/remote-config';

import firebase from 'firebase/app';
import { createContext, useContext } from 'react';
import * as Yup from 'yup';

export type RestrictedAppraisalContextType = {
  restrictedMakes: string[];
  restrictedModels: {
    make: string;
    model: string;
  }[];
  restrictedYears: {
    make: string;
    model: string;
    yearMin: number;
    yearMax: number;
  }[];
  restrictedStates: {
    state: string;
    zipCodeMin: number;
    zipCodeMax: number;
  }[];
  restrictedZipCodes: {
    zipCode: string;
  }[];
};

const RestrictedAppraisalContextSchema = Yup.object().shape({
  restrictedMakes: Yup.array().of(Yup.string().required()).required(),
  restrictedModels: Yup.array()
    .of(
      Yup.object()
        .shape({
          make: Yup.string().required(),
          model: Yup.string().required(),
        })
        .required()
    )
    .required(),
  restrictedYears: Yup.array()
    .of(
      Yup.object()
        .shape({
          make: Yup.string().required(),
          model: Yup.string().required(),
          yearMin: Yup.number().required(),
          yearMax: Yup.number().required(),
        })
        .required()
    )
    .required(),
  restrictedStates: Yup.array()
    .of(
      Yup.object()
        .shape({
          state: Yup.string().required(),
          zipCodeMin: Yup.number().required(),
          zipCodeMax: Yup.number().required(),
        })
        .required()
    )
    .required(),
  restrictedZipCodes: Yup.array()
    .of(
      Yup.object()
        .shape({
          zipCode: Yup.string().required(),
        })
        .required()
    )
    .required(),
});

export const defaultRestrictedContextValue = {
  restrictedMakes: [],
  restrictedModels: [],
  restrictedYears: [],
  restrictedStates: [],
  restrictedZipCodes: [],
};
export const RestrictedAppraisalContext = createContext<{
  value: RestrictedAppraisalContextType;
  loaded: boolean;
}>({
  value: defaultRestrictedContextValue,
  loaded: false,
});

const getFirebaseApp = () =>
  firebase.apps.find((firebaseApp) => firebaseApp.name === 'appraisalFirebase');
export const getRestrictedAppraisalContext = async (
  firebaseConfig: Record<string, string>
): Promise<RestrictedAppraisalContextType> => {
  const appraisalFirebaseApp =
    getFirebaseApp() ||
    firebase.initializeApp(firebaseConfig, 'appraisalFirebase');
  const remoteConfig = appraisalFirebaseApp.remoteConfig();

  try {
    await remoteConfig.fetchAndActivate();

    const restrictedMakes = JSON.parse(
      remoteConfig.getValue('appraisal_restricted_makes').asString()
    );
    const restrictedModels = JSON.parse(
      remoteConfig.getValue('appraisal_restricted_models').asString()
    );
    const restrictedYears = JSON.parse(
      remoteConfig.getValue('appraisal_restricted_years').asString()
    );
    const restrictedStates = JSON.parse(
      remoteConfig.getValue('appraisal_restricted_states').asString()
    );
    const restrictedZipCodes = JSON.parse(
      remoteConfig.getValue('appraisal_restricted_zipcodes').asString()
    );

    const restrictedAppraisalContextValue = {
      restrictedMakes,
      restrictedModels,
      restrictedYears,
      restrictedStates,
      restrictedZipCodes,
    };
    // will throw if not valid
    RestrictedAppraisalContextSchema.validateSync(
      restrictedAppraisalContextValue
    );

    return restrictedAppraisalContextValue;
  } catch (error) {
    console.error('Error while fetching restricted appraisal context', error);
  }

  return defaultRestrictedContextValue;
};

export const useRestrictedAppraisal = () => {
  return useContext(RestrictedAppraisalContext);
};
