import MaxAndMinInputsStore from './store';
import { Variant } from 'src/modules/cars/Santander/components/Filters/components/MaxAndMinInputs';
import { MaxAndMin } from '@vroom-web/catalog-url-integration';
jest.mock('lodash.debounce', () => jest.fn((fn) => fn));

interface ConstructorProps {
  onChange: (value?: MaxAndMin) => void;
  range: MaxAndMin;
  value?: MaxAndMin;
  variant: Variant;
}

describe('Max and Min Store', () => {
  const range = {
    min: 1,
    max: 10,
  };

  const variant = Variant.MAX_AND_MIN;

  describe('Set MIN Input Value', () => {
    it('should set max from range and min from args', () => {
      const mockedOnChange = jest.fn();
      const constructorProps: ConstructorProps = {
        onChange: mockedOnChange,
        range: range,
        variant: variant,
        value: undefined,
      };
      const store = new MaxAndMinInputsStore(constructorProps);
      store.setMinInputValue('2');
      expect(mockedOnChange).toHaveBeenCalledTimes(1);
      expect(mockedOnChange).toHaveBeenCalledWith({
        min: 2,
        max: 10,
      });
    });

    it('should set max from value and min from args', () => {
      const mockedOnChange = jest.fn();
      const constructorProps: ConstructorProps = {
        onChange: mockedOnChange,
        range: range,
        variant: variant,
        value: {
          min: 3,
          max: 8,
        },
      };
      const store = new MaxAndMinInputsStore(constructorProps);
      store.setMinInputValue('4');
      expect(mockedOnChange).toHaveBeenCalledTimes(1);
      expect(mockedOnChange).toHaveBeenCalledWith({
        min: 4,
        max: 8,
      });
    });

    it('should do nothing when no input', () => {
      const mockedOnChange = jest.fn();
      const constructorProps: ConstructorProps = {
        onChange: mockedOnChange,
        range: range,
        variant: variant,
      };
      const store = new MaxAndMinInputsStore(constructorProps);
      store.setMinInputValue('');
      expect(mockedOnChange).toHaveBeenCalledTimes(1);
      expect(store.hasInputError).toBeFalsy();
      expect(mockedOnChange).toHaveBeenCalledWith(undefined);
    });

    it('should do nothing when no input and has max value', () => {
      const mockedOnChange = jest.fn();
      const constructorProps: ConstructorProps = {
        onChange: mockedOnChange,
        range: range,
        variant: variant,
        value: {
          min: 3,
          max: 8,
        },
      };
      const store = new MaxAndMinInputsStore(constructorProps);
      store.setMinInputValue('');
      expect(mockedOnChange).not.toHaveBeenCalled();
    });

    it('should set error when input < range min value', () => {
      const mockedOnChange = jest.fn();
      const constructorProps: ConstructorProps = {
        onChange: mockedOnChange,
        range: range,
        variant: variant,
      };
      const store = new MaxAndMinInputsStore(constructorProps);
      store.setMinInputValue('0');
      expect(mockedOnChange).not.toHaveBeenCalled();
      expect(store.hasInputError).toBeTruthy();
    });
  });

  describe('Set MAX Input Value', () => {
    it('should set min from range and max from args', () => {
      const mockedOnChange = jest.fn();
      const constructorProps: ConstructorProps = {
        onChange: mockedOnChange,
        range: range,
        variant: variant,
        value: undefined,
      };
      const store = new MaxAndMinInputsStore(constructorProps);
      store.setMaxInputValue('8');
      expect(mockedOnChange).toHaveBeenCalledTimes(1);
      expect(mockedOnChange).toHaveBeenCalledWith({
        min: 1,
        max: 8,
      });
    });

    it('should set min from value and max from args', () => {
      const mockedOnChange = jest.fn();
      const constructorProps: ConstructorProps = {
        onChange: mockedOnChange,
        range: range,
        variant: variant,
        value: {
          min: 3,
          max: 8,
        },
      };
      const store = new MaxAndMinInputsStore(constructorProps);
      store.setMaxInputValue('10');
      expect(mockedOnChange).toHaveBeenCalledTimes(1);
      expect(mockedOnChange).toHaveBeenCalledWith({
        min: 3,
        max: 10,
      });
    });

    it('should do nothing when no input', () => {
      const mockedOnChange = jest.fn();
      const constructorProps: ConstructorProps = {
        onChange: mockedOnChange,
        range: range,
        variant: variant,
      };
      const store = new MaxAndMinInputsStore(constructorProps);
      store.setMaxInputValue('');
      expect(mockedOnChange).toHaveBeenCalledTimes(1);
      expect(store.hasInputError).toBeFalsy();
      expect(mockedOnChange).toHaveBeenCalledWith(undefined);
    });

    it('should do nothing when no input and has min value', () => {
      const mockedOnChange = jest.fn();
      const constructorProps: ConstructorProps = {
        onChange: mockedOnChange,
        range: range,
        variant: variant,
        value: {
          min: 3,
          max: 8,
        },
      };
      const store = new MaxAndMinInputsStore(constructorProps);
      store.setMaxInputValue('');
      expect(mockedOnChange).not.toHaveBeenCalled();
    });

    it('should set error when input > range max value', () => {
      const mockedOnChange = jest.fn();
      const constructorProps: ConstructorProps = {
        onChange: mockedOnChange,
        range: range,
        variant: variant,
      };
      const store = new MaxAndMinInputsStore(constructorProps);
      store.setMaxInputValue('12');
      expect(mockedOnChange).not.toHaveBeenCalled();
      expect(store.hasInputError).toBeTruthy();
    });
  });

  describe('Slider Value', () => {
    const constructorProps: ConstructorProps = {
      onChange: jest.fn(),
      range: range,
      variant: variant,
      value: undefined,
    };
    const store = new MaxAndMinInputsStore(constructorProps);
    describe('Set Min Slider Value', () => {
      it('should set min slider value', () => {
        store.setMinSliderValue(2);
        expect(store.minSliderValue).toEqual(2);
      });
      it('should set max slider value', () => {
        store.setMaxSliderValue(2);
        expect(store.maxSliderValue).toEqual(2);
      });
    });
  });
});
