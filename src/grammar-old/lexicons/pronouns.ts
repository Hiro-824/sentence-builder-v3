import { Block } from "../block"
import { Lexicon } from "../category"

// 一人称単数
export const I_Lexicon: Lexicon = {
    word: "I",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["1S"],
                case: ["nom"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "私"
            }
        },
    ],
}

export const My_Lexicon: Lexicon = {
    word: "my",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["3S"],
                case: ["nom", "acc"]
            },
            specifiers: [],
            complements: [
                {
                    base: "NP",
                    features: {
                        φ: ["3S"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            ],
            translation: {
                "base": "私の{C1}"
            },
        },
        {
            base: "DP",
            features: {
                φ: ["3P"],
                case: ["nom", "acc"]
            },
            specifiers: [],
            complements: [
                {
                    base: "NP",
                    features: {
                        φ: ["3P"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            ],
            translation: {
                "base": "私の{C1}"
            },
        }
    ],
}

export const Me_Lexicon: Lexicon = {
    word: "me",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["1S"],
                case: ["acc"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "私"
            },
        },
    ],
}

export const Mine_Lexicon: Lexicon = {
    word: "mine",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["3S"],
                case: ["nom", "acc"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "私のもの"
            },
        },
    ],
}

export const Myself_Lexicon: Lexicon = {
    word: "myself",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["1S"],
                case: ["acc"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "私自身"
            },
        },
    ],
}

export const I_Block: Block = {
    id: "I",
    lexicons: [
        I_Lexicon,
        My_Lexicon,
        Me_Lexicon,
        Mine_Lexicon,
        Myself_Lexicon,
    ],
    x: 0,
    y: 0,
    color: "dodgerblue",
    isRound: true,
    children: [
        {
            id: "head",
            hidden: false,
            keepEmpty: false,
            type: "dropdown",
            content: [
                "I",
                "my",
                "me",
                "mine",
                "myself",
            ],
            selected: 0
        },
        {
            id: "complement",
            hidden: true,
            keepEmpty: false,
            type: "placeholder",
            content: null,
            headIndex: [1]
        }
    ]
}

// 一人称複数
export const We_Lexicon: Lexicon = {
    word: "we",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["1P"],
                case: ["nom"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "私たち"
            }
        },
    ],
}

export const Our_Lexicon: Lexicon = {
    word: "our",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["3S"],
                case: ["nom", "acc"]
            },
            specifiers: [],
            complements: [
                {
                    base: "NP",
                    features: {
                        φ: ["3S"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            ],
            translation: {
                "base": "私たちの{C1}"
            },
        },
        {
            base: "DP",
            features: {
                φ: ["3P"],
                case: ["nom", "acc"]
            },
            specifiers: [],
            complements: [
                {
                    base: "NP",
                    features: {
                        φ: ["3P"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            ],
            translation: {
                "base": "私たちの{C1}"
            },
        }
    ],
}

export const Us_Lexicon: Lexicon = {
    word: "us",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["3P"],
                case: ["acc"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "私たち"
            },
        },
    ],
}

export const Ours_Lexicon: Lexicon = {
    word: "mine",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["3S", "3P"],
                case: ["nom", "acc"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "私たちのもの"
            },
        },
    ],
}

export const Ourselves_Lexicon: Lexicon = {
    word: "ourselves",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["1P"],
                case: ["acc"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "私たち自身"
            },
        },
    ],
}

export const We_Block: Block = {
    id: "We",
    lexicons: [
        We_Lexicon,
        Our_Lexicon,
        Us_Lexicon,
        Ours_Lexicon,
        Ourselves_Lexicon,
    ],
    x: 0,
    y: 0,
    color: "dodgerblue",
    isRound: true,
    children: [
        {
            id: "head",
            hidden: false,
            keepEmpty: false,
            type: "dropdown",
            content: [
                "we",
                "us",
                "our",
                "ours",
                "ourselves",
            ],
            selected: 0
        },
        {
            id: "complement",
            hidden: true,
            keepEmpty: false,
            type: "placeholder",
            content: null,
            headIndex: [1]
        }
    ]
}

// 二人称単数
export const You_Lexicon: Lexicon = {
    word: "you",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["2S"],
                case: ["nom", "acc"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "あなた"
            }
        },
    ],
}

export const Your_Lexicon: Lexicon = {
    word: "your",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["3S"],
                case: ["nom", "acc"]
            },
            specifiers: [],
            complements: [
                {
                    base: "NP",
                    features: {
                        φ: ["3S"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            ],
            translation: {
                "base": "あなたの{C1}"
            },
        },
        {
            base: "DP",
            features: {
                φ: ["3P"],
                case: ["nom", "acc"]
            },
            specifiers: [],
            complements: [
                {
                    base: "NP",
                    features: {
                        φ: ["3P"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            ],
            translation: {
                "base": "あなたの{C1}"
            },
        }
    ],
}

export const Yours_Lexicon: Lexicon = {
    word: "yours",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["3S"],
                case: ["nom", "acc"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "あなたのもの"
            },
        },
    ],
}

export const Yourself_Lexicon: Lexicon = {
    word: "yourself",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["2S"],
                case: ["acc"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "あなた自身"
            },
        },
    ],
}

export const You_Block: Block = {
    id: "I",
    lexicons: [
        You_Lexicon,
        Your_Lexicon,
        Yours_Lexicon,
        Yourself_Lexicon,
    ],
    x: 0,
    y: 0,
    color: "dodgerblue",
    isRound: true,
    children: [
        {
            id: "head",
            hidden: false,
            keepEmpty: false,
            type: "dropdown",
            content: [
                "you",
                "your",
                "yours",
                "youself",
            ],
            selected: 0
        },
        {
            id: "complement",
            hidden: true,
            keepEmpty: false,
            type: "placeholder",
            content: null,
            headIndex: [1]
        }
    ]
}

// 三人称単数男性
export const He_Lexicon: Lexicon = {
    word: "he",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["3S"],
                case: ["nom"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "彼"
            }
        },
    ],
}

export const His_Lexicon: Lexicon = {
    word: "his",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["3S"],
                case: ["nom", "acc"]
            },
            specifiers: [],
            complements: [
                {
                    base: "NP",
                    features: {
                        φ: ["3S"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            ],
            translation: {
                "base": "彼の{C1}"
            },
        },
        {
            base: "DP",
            features: {
                φ: ["3P"],
                case: ["nom", "acc"]
            },
            specifiers: [],
            complements: [
                {
                    base: "NP",
                    features: {
                        φ: ["3P"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            ],
            translation: {
                "base": "彼の{C1}"
            },
        }
    ],
}

export const Him_Lexicon: Lexicon = {
    word: "him",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["3S"],
                case: ["acc"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "彼"
            },
        },
    ],
}

export const HisPron_Lexicon: Lexicon = {
    word: "his",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["3S"],
                case: ["nom", "acc"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "彼のもの"
            },
        },
    ],
}

export const Himself_Lexicon: Lexicon = {
    word: "himself",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["3S"],
                case: ["rfl"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "彼自身"
            },
        },
    ],
}

export const He_Block: Block = {
    id: "he",
    lexicons: [
        He_Lexicon,
        His_Lexicon,
        Him_Lexicon,
        HisPron_Lexicon,
        Himself_Lexicon,
    ],
    x: 0,
    y: 0,
    color: "dodgerblue",
    isRound: true,
    children: [
        {
            id: "head",
            hidden: false,
            keepEmpty: false,
            type: "dropdown",
            content: [
                "he",
                "his",
                "him",
                "his",
                "himself",
            ],
            selected: 0
        },
        {
            id: "complement",
            hidden: true,
            keepEmpty: false,
            type: "placeholder",
            content: null,
            headIndex: [1]
        }
    ]
}

// 三人称単数女性
export const She_Lexicon: Lexicon = {
    word: "she",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["3S"],
                case: ["nom"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "彼女"
            }
        },
    ],
}

export const Her_Lexicon: Lexicon = {
    word: "her",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["3S"],
                case: ["nom", "acc"]
            },
            specifiers: [],
            complements: [
                {
                    base: "NP",
                    features: {
                        φ: ["3S"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            ],
            translation: {
                "base": "彼女の{C1}"
            },
        },
        {
            base: "DP",
            features: {
                φ: ["3P"],
                case: ["nom", "acc"]
            },
            specifiers: [],
            complements: [
                {
                    base: "NP",
                    features: {
                        φ: ["3P"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            ],
            translation: {
                "base": "彼女の{C1}"
            },
        }
    ],
}

export const HerObj_Lexicon: Lexicon = {
    word: "her",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["3S"],
                case: ["acc"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "彼女"
            },
        },
    ],
}

export const Hers_Lexicon: Lexicon = {
    word: "hers",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["3S"],
                case: ["nom", "acc"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "彼女のもの"
            },
        },
    ],
}

export const Herself_Lexicon: Lexicon = {
    word: "herself",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["3S"],
                case: ["rfl"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "彼女自身"
            },
        },
    ],
}

export const She_Block: Block = {
    id: "she",
    lexicons: [
        She_Lexicon,
        Her_Lexicon,
        HerObj_Lexicon,
        Hers_Lexicon,
        Herself_Lexicon,
    ],
    x: 0,
    y: 0,
    color: "dodgerblue",
    isRound: true,
    children: [
        {
            id: "head",
            hidden: false,
            keepEmpty: false,
            type: "dropdown",
            content: [
                "she",
                "her",
                "her",
                "hers",
                "herself",
            ],
            selected: 0
        },
        {
            id: "complement",
            hidden: true,
            keepEmpty: false,
            type: "placeholder",
            content: null,
            headIndex: [1]
        }
    ]
}

// 三人称単数中性
export const It_Lexicon: Lexicon = {
    word: "it",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["3S"],
                case: ["nom", "acc"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "それ"
            }
        },
    ],
}

export const Its_Lexicon: Lexicon = {
    word: "its",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["3S"],
                case: ["nom", "acc"]
            },
            specifiers: [],
            complements: [
                {
                    base: "NP",
                    features: {
                        φ: ["3S"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            ],
            translation: {
                "base": "それの{C1}"
            },
        },
        {
            base: "DP",
            features: {
                φ: ["3P"],
                case: ["nom", "acc"]
            },
            specifiers: [],
            complements: [
                {
                    base: "NP",
                    features: {
                        φ: ["3P"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            ],
            translation: {
                "base": "それの{C1}"
            },
        }
    ],
}

export const ItsPron_Lexicon: Lexicon = {
    word: "its",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["3S"],
                case: ["nom", "acc"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "それのもの"
            },
        },
    ],
}

export const Itself_Lexicon: Lexicon = {
    word: "itself",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["3S"],
                case: ["rfl"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "それ自体"
            },
        },
    ],
}

export const It_Block: Block = {
    id: "it",
    lexicons: [
        It_Lexicon,
        Its_Lexicon,
        ItsPron_Lexicon,
        Itself_Lexicon,
    ],
    x: 0,
    y: 0,
    color: "dodgerblue",
    isRound: true,
    children: [
        {
            id: "head",
            hidden: false,
            keepEmpty: false,
            type: "dropdown",
            content: [
                "it",
                "its",
                "its",
                "itself",
            ],
            selected: 0
        },
        {
            id: "complement",
            hidden: true,
            keepEmpty: false,
            type: "placeholder",
            content: null,
            headIndex: [1]
        }
    ]
}

// 三人称複数
export const They_Lexicon: Lexicon = {
    word: "they",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["3P"],
                case: ["nom"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "彼ら(それら)"
            }
        },
    ],
}

export const Their_Lexicon: Lexicon = {
    word: "their",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["3S"],
                case: ["nom", "acc"]
            },
            specifiers: [],
            complements: [
                {
                    base: "NP",
                    features: {
                        φ: ["3S"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            ],
            translation: {
                "base": "彼ら(それら)の{C1}"
            },
        },
        {
            base: "DP",
            features: {
                φ: ["3P"],
                case: ["nom", "acc"]
            },
            specifiers: [],
            complements: [
                {
                    base: "NP",
                    features: {
                        φ: ["3P"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            ],
            translation: {
                "base": "彼ら(それら)の{C1}"
            },
        }
    ],
}

export const Them_Lexicon: Lexicon = {
    word: "them",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["3P"],
                case: ["acc"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "彼ら(それら)"
            },
        },
    ],
}

export const Theirs_Lexicon: Lexicon = {
    word: "theirs",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["3P"],
                case: ["nom", "acc"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "彼ら(それら)のもの"
            },
        },
    ],
}

export const Themselves_Lexicon: Lexicon = {
    word: "themselves",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["3P"],
                case: ["rfl"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "彼ら(それら)自身"
            },
        },
    ],
}

export const They_Block: Block = {
    id: "they",
    lexicons: [
        They_Lexicon,
        Their_Lexicon,
        Them_Lexicon,
        Theirs_Lexicon,
        Themselves_Lexicon,
    ],
    x: 0,
    y: 0,
    color: "dodgerblue",
    isRound: true,
    children: [
        {
            id: "head",
            hidden: false,
            keepEmpty: false,
            type: "dropdown",
            content: [
                "they",
                "their",
                "them",
                "theirs",
                "themselves",
            ],
            selected: 0
        },
        {
            id: "complement",
            hidden: true,
            keepEmpty: false,
            type: "placeholder",
            content: null,
            headIndex: [1]
        }
    ]
}