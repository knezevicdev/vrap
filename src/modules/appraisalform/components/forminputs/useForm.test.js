import { act } from 'react-dom/test-utils';
import useForm from './useForm';
import { testHook } from '@test/helpers/testUtils';

describe('useForm', () => {
  const initFields = {
    bool: false,
    array: [],
    object: {
      isRequired: false,
      value: {}
    },
    string: {
      isRequired: false,
      value: ''
    },
    number: null
  };

  let testForm;
  beforeEach(() => {
    testHook(() => {
      testForm = useForm({ defaultValues: initFields });
    });
  });

  test('initializes useForm', () => {
    expect(testForm.fields).toBeDefined();
    expect(testForm.isFormValid).toBeDefined();
    expect(testForm.setFormFields).toBeDefined();
    expect(testForm.updateMultipleFields).toBeDefined();
    expect(testForm.resetForm).toBeDefined();
  });

  test('allows specific fields to be changed', () => {
    const boolField = testForm.fields.bool;
    act(() => {
      boolField.onChange({ ...boolField, value: true });
    });
    expect(testForm.fields.bool.value).toEqual(true);
  });

  test('allows a group of fields to update', () => {
    const fieldsToUpdate = {
      bool: {
        ...testForm.fields.bool,
        value: true
      },
      number: {
        ...testForm.fields.number,
        value: 9
      },
      array: {
        ...testForm.fields.array,
        value: [1, 2, 3, 4]
      }
    };

    act(() => {
      testForm.updateMultipleFields(fieldsToUpdate);
    });
    expect(testForm.fields.bool.value).toEqual(true);
    expect(testForm.fields.number.value).toEqual(9);
    expect(testForm.fields.array.value).toEqual([1, 2, 3, 4]);
    expect(testForm.fields.object.value).toEqual({});
    expect(testForm.fields.string.value).toEqual('');
  });

  test('determines validity of the form', () => {
    const boolField = testForm.fields.bool;
    act(() => {
      boolField.onChange({ ...boolField, value: true, error: true });
    });
    expect(testForm.isFormValid).toEqual(false);
  });

  test('resets the form', () => {
    const fieldsToUpdate = {
      bool: {
        ...testForm.fields.bool,
        value: true
      },
      number: {
        ...testForm.fields.number,
        value: 9
      },
      array: {
        ...testForm.fields.array,
        value: [1, 2, 3, 4]
      }
    };

    act(() => {
      testForm.updateMultipleFields(fieldsToUpdate);
    });
    expect(testForm.fields.bool.value).toEqual(true);
    expect(testForm.fields.number.value).toEqual(9);
    expect(testForm.fields.array.value).toEqual([1, 2, 3, 4]);

    act(() => {
      testForm.resetForm();
    });
    expect(testForm.fields.bool.value).toEqual(false);
    expect(testForm.fields.number.value).toEqual(null);
    expect(testForm.fields.array.value).toEqual([]);
    expect(testForm.fields.object.value).toEqual({});
    expect(testForm.fields.string.value).toEqual('');
  });
});
