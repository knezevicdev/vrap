import ViewModel from '../ViewModel';

describe('CongratsCard Test', () => {
  const viewModel = new ViewModel();

  afterEach(() => {
    localStorage.removeItem('priceId');
  });

  it('readonly values', () => {
    expect(viewModel.title).toBe(`thank you for submitting`);
    expect(viewModel.information1).toBe(
      `Don't hesitate to contact us if you have questions.`
    );
    expect(viewModel.information2).toBe(
      'paperwork@vroom.com or (855) 534-3755.'
    );
  });
});
