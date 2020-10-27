export declare enum Filters {
    BODY_TYPES = "bodytypes",
    COLORS = "colors",
    DRIVE_TYPE = "drivetype",
    MAKE_AND_MODELS = "makesandmodels",
    MILES = "miles",
    PAGE = "page",
    PRICE = "price",
    SEARCH = "search",
    SORT = "sort",
    TEST_DRIVE = "testdrive",
    TRANSMISSION = "transmission",
    YEAR = "year",
    CYLINDERS = "cylinders",
    OTHER_CYLINDERS = "othercylinders",
    POPULAR_FEATURES = "optionalfeatures"
}
export declare enum BodyType {
    CONVERTIBLE = "convertible",
    COUPE = "coupe",
    HATCHBACK = "hatchback",
    MINIVAN = "minivan",
    SEDAN = "sedan",
    SUV = "suv",
    TRUCK = "truck",
    WAGON = "wagon"
}
export declare enum Color {
    BLACK = "black",
    BLUE = "blue",
    BROWN = "brown",
    GOLD = "gold",
    GREEN = "green",
    GREY = "grey",
    ORANGE = "orange",
    PURPLE = "purple",
    RED = "red",
    SILVER = "silver",
    WHITE = "white",
    YELLOW = "yellow"
}
export declare enum DriveType {
    FOUR_BY_FOUR = "4x4",
    AWD = "awd",
    FWD = "fwd",
    RWD = "rwd"
}
export interface Make {
    makeSlug: string;
    modelSlugs?: string[];
}
export declare type MakeAndModels = Make[];
export interface MaxAndMin {
    min: number;
    max: number;
}
export declare enum SortBy {
    MILES = "miles",
    PRICE = "price",
    YEAR = "year"
}
export declare enum SortDirection {
    ASCENDING = "asc",
    DESCENDING = "desc"
}
export interface Sort {
    by: SortBy;
    direction: SortDirection;
}
export declare enum TestDrive {
    AVAILABLE = "available"
}
export declare enum Transmission {
    AUTO = "auto",
    MANUAL = "manual"
}
export declare enum Cylinder {
    FOUR = "4",
    SIX = "6",
    EIGHT = "8"
}
export declare enum PopularFeatures {
    ANDROID_AUTO = "android_auto",
    APPLE_CAR_PLAY = "apple_car_play",
    HEATED_SEATS = "heated_seats",
    REAR_VIEW_CAMERA = "rear_view_camera",
    REMOTE_START = "remote_start",
    SUNROOF_MOONROOF = "sunroof_moonroof",
    THIRD_ROW_SEATING = "third_row_seating"
}
export interface FiltersData {
    [Filters.BODY_TYPES]?: BodyType[];
    [Filters.COLORS]?: Color[];
    [Filters.DRIVE_TYPE]?: DriveType[];
    [Filters.MAKE_AND_MODELS]?: MakeAndModels;
    [Filters.MILES]?: MaxAndMin;
    [Filters.PAGE]?: number;
    [Filters.PRICE]?: MaxAndMin;
    [Filters.SEARCH]?: string;
    [Filters.SORT]?: Sort;
    [Filters.TEST_DRIVE]?: TestDrive;
    [Filters.TRANSMISSION]?: Transmission;
    [Filters.YEAR]?: MaxAndMin;
    [Filters.CYLINDERS]?: Cylinder[];
    [Filters.OTHER_CYLINDERS]?: boolean;
    [Filters.POPULAR_FEATURES]?: PopularFeatures[];
}
export interface GetUrlFromFiltersDataOptions {
    addFiltersQueryParam?: boolean;
    ignoreParamsBasePath?: boolean;
    titleQuery?: boolean;
}
