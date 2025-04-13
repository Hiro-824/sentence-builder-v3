import { Category } from "../category";

export const TPs: Category[] = [
    {
        base: "TP",
        features: {},
        specifiers: [
            {
                base: "DP",
                features: {
                    case: ["nom"],
                    φ: ["1S", "2S", "1P", "2P", "3P"]
                },
                specifiers: [],
                complements: []
            }
        ],
        complements: [
            {
                base: "Tbar",
                features: {
                    form: ["base", "past"]
                },
                specifiers: [],
                complements: []
            }
        ]
    },
    {
        base: "TP",
        features: {},
        specifiers: [
            {
                base: "DP",
                features: {
                    case: ["nom"],
                    φ: ["3S"]
                },
                specifiers: [],
                complements: []
            }
        ],
        complements: [
            {
                base: "Tbar",
                features: {
                    form: ["3S", "past"]
                },
                specifiers: [],
                complements: []
            }
        ]
    }
]

export const ICategory: Category = {
    base: "DP",
    features: {
        case: ["nom"],
        φ: ["1S"]
    },
    specifiers: [],
    complements: []
}

export const SheCategory: Category = {
    base: "DP",
    features: {
        case: ["nom"],
        φ: ["3S"]
    },
    specifiers: [],
    complements: []
}

export const ItCategories: Category[] = [
    {
        base: "DP",
        features: {
            case: ["nom", "acc"],
            φ: ["3S"]
        },
        specifiers: [],
        complements: []
    },
]

export const LoveCategories: Category[] = [
    {
        base: "Tbar",
        features: {
            form: ["base"]
        },
        specifiers: [],
        complements: [
            {
                base: "DP",
                features: {
                    case: ["acc"]
                },
                specifiers: [],
                complements: []
            }
        ]
    },
    {
        base: "VP",
        features: {
            form: ["base"]
        },
        specifiers: [],
        complements: [
            {
                base: "DP",
                features: {
                    case: ["acc"]
                },
                specifiers: [],
                complements: []
            }
        ]
    }
]

export const LovesCategories: Category[] = [
    {
        base: "Tbar",
        features: {
            form: ["3S"]
        },
        specifiers: [],
        complements: [
            {
                base: "DP",
                features: {
                    case: ["acc"]
                },
                specifiers: [],
                complements: []
            }
        ]
    },
]

export const NotCategory: Category = {
    base: "VP",
    features: {
        form: ["base"],
        isNeg: ["+"]
    },
    specifiers: [],
    complements: [
        {
            base: "VP",
            features: {
                form: ["base"],
                isNeg: ["-"]
            },
            specifiers: [],
            complements: []
        }
    ]
}

export const BeautifulCategory: Category = {
    base: "AdjP",
    features: {},
    specifiers: [],
    complements: [],
    modify: {
        target: {
            base: "NP",
            features: {},
            specifiers: [],
            complements: []
        },
        side: "left"
    }
}