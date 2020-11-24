import React from 'react';
import {withDesign} from 'storybook-addon-designs';

export default {
    title: 'Checkout/Congrats/Success',
    decorators: [withDesign],
};

export const Success = () => {
    return <div>hello</div>;
};

Success.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/yhvMWzN95E1DdNLBfEr5OH/Desktop-Congrats?node-id=1%3A4'
    }
};