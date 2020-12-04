import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

const Banner: React.FC = () => <View viewModel={new ViewModel()} />;

export default Banner;
