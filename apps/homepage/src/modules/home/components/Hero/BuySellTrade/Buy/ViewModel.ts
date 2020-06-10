interface Link {
    label: string;
    href: string;
}

class BuyViewModel {
    readonly mobileButtonLabel: string = 'Browse All Vehicles';
    readonly link: Link = {
        href: '/catalog',
        label: 'Browse thousands of low-mileage cars and trucks',
    };
}

export default BuyViewModel;
