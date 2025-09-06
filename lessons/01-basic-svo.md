---
title: '1. 英語の基本の文'
order: 2
---
公園で友達と、お互いの好きな動物について話しています。英語で「私は犬が好きです」と伝えるには、どうすればいいでしょうか？英語の文の基本的な組み立て方を見ていきましょう。

## 例文の作り方

英語の文は、「だれが」「どうする」「なにを」という順番でブロックを並べるのが基本です。

1.  まず、「だれが」にあたる主語を置きます。ここでは「私」なので、`I` のブロックを置きましょう。
    ```sentence
    {
    "id": "",
    "x": 0,
    "y": 0,
    "color": "dodgerblue",
    "isRound": true,
    "words": [
        {
            "token": "I",
            "categories": [
                {
                    "head": {
                        "type": {
                            "type": "nominal",
                            "isDet": true,
                            "isTo": false,
                            "isGerund": false,
                            "isPron": true,
                            "isProper": false
                        },
                        "case": "nom",
                        "agr": {
                            "type": "non-3sing",
                            "per": 1,
                            "num": "sing"
                        }
                    },
                    "translationTemplates": {
                        "default": [
                            "私"
                        ]
                    }
                }
            ]
        },
        {
            "token": "my",
            "categories": [
                {
                    "head": {
                        "type": {
                            "type": "nominal",
                            "isDet": true,
                            "isTo": false,
                            "isGerund": false
                        },
                        "agr": {
                            "per": 3
                        },
                        "determinered": true
                    },
                    "right": [
                        {
                            "head": {
                                "type": {
                                    "type": "nominal",
                                    "isDet": false,
                                    "isTo": false,
                                    "isGerund": false,
                                    "isPron": false,
                                    "isProper": false
                                },
                                "agr": {}
                            }
                        }
                    ],
                    "customUnification": [
                        [
                            [
                                "head",
                                "agr"
                            ],
                            [
                                "right",
                                0,
                                "head",
                                "agr"
                            ]
                        ]
                    ],
                    "translationTemplates": {
                        "default": [
                            "私の",
                            {
                                "path": [
                                    "right",
                                    0
                                ],
                                "key": "default"
                            }
                        ]
                    }
                },
                {
                    "head": {
                        "type": {
                            "type": "nominal",
                            "isDet": true,
                            "isTo": false,
                            "isGerund": false
                        },
                        "agr": {
                            "type": "3sing"
                        },
                        "determinered": true
                    },
                    "right": [
                        {
                            "head": {
                                "type": {
                                    "type": "nominal",
                                    "isDet": true,
                                    "isTo": false,
                                    "isGerund": false
                                }
                            },
                            "gaps": [
                                {
                                    "head": {
                                        "type": {
                                            "type": "nominal",
                                            "isDet": true,
                                            "isTo": false,
                                            "isGerund": false
                                        }
                                    }
                                }
                            ]
                        }
                    ],
                    "translationTemplates": {
                        "default": [
                            "私が",
                            {
                                "path": [
                                    "right",
                                    0
                                ],
                                "key": "default"
                            }
                        ]
                    }
                }
            ]
        },
        {
            "token": "me",
            "categories": [
                {
                    "head": {
                        "type": {
                            "type": "nominal",
                            "isDet": true,
                            "isTo": false,
                            "isGerund": false,
                            "isPron": true,
                            "isProper": false
                        },
                        "case": "acc",
                        "agr": {
                            "type": "non-3sing",
                            "per": 1,
                            "num": "sing"
                        }
                    },
                    "translationTemplates": {
                        "default": [
                            "私"
                        ]
                    }
                }
            ]
        },
        {
            "token": "mine",
            "categories": [
                {
                    "head": {
                        "type": {
                            "type": "nominal",
                            "isDet": true,
                            "isTo": false,
                            "isGerund": false,
                            "isPron": true,
                            "isProper": false
                        },
                        "agr": {
                            "per": 3,
                            "num": "sing"
                        }
                    },
                    "translationTemplates": {
                        "default": [
                            "私のもの"
                        ]
                    }
                }
            ]
        },
        {
            "token": "myself",
            "categories": [
                {
                    "head": {
                        "type": {
                            "type": "nominal",
                            "isDet": true,
                            "isTo": false,
                            "isGerund": false,
                            "isPron": true,
                            "isProper": false
                        },
                        "refl": true,
                        "agr": {
                            "type": "non-3sing",
                            "per": 1,
                            "num": "sing"
                        }
                    },
                    "translationTemplates": {
                        "default": [
                            "私自身"
                        ]
                    }
                }
            ]
        }
    ],
    "children": [
        {
            "id": "head",
            "type": "dropdown",
            "content": [
                "I",
                "my",
                "me",
                "mine",
                "myself"
            ],
            "selected": 0,
            "hidden": false,
            "resolved": false
        },
        {
            "id": "complement",
            "type": "placeholder",
            "content": null,
            "hidden": true,
            "headIndex": [
                1
            ],
            "resolved": false,
            "instanceId": "inst_5d9a3406a17d47dc840a09cf088740f5"
        }
    ],
    "translation": "私"
    }
    ```

2.  次に、「どうする」にあたる動詞を追加します。「好きです」なので、`like` のブロックをつなげます。
    ```sentence
    {
    "id": "",
    "x": 0,
    "y": 0,
    "color": "orange",
    "words": [
        {
            "token": "",
            "categories": [
                {
                    "head": {
                        "type": "sentence",
                        "finite": true,
                        "inverted": false,
                        "negative": false
                    },
                    "left": [
                        {
                            "head": {
                                "type": {
                                    "type": "nominal",
                                    "isDet": true
                                },
                                "case": "nom"
                            }
                        }
                    ],
                    "right": [
                        {
                            "head": {
                                "type": "verb",
                                "finite": true
                            },
                            "gaps": [
                                {
                                    "head": {
                                        "type": {
                                            "type": "nominal"
                                        },
                                        "case": "nom"
                                    }
                                }
                            ]
                        }
                    ],
                    "customUnification": [
                        [
                            [
                                "left",
                                0,
                                "head"
                            ],
                            [
                                "right",
                                0,
                                "gaps",
                                0,
                                "head"
                            ]
                        ]
                    ],
                    "translationTemplates": {
                        "default": [
                            {
                                "path": [
                                    "left",
                                    0
                                ],
                                "key": "default",
                                "particle": "は"
                            },
                            {
                                "path": [
                                    "right",
                                    0
                                ],
                                "key": "default"
                            }
                        ],
                        "nominal": [
                            {
                                "path": [
                                    "left",
                                    0
                                ],
                                "key": "default",
                                "particle": "が"
                            },
                            {
                                "path": [
                                    "right",
                                    0
                                ],
                                "key": "default"
                            }
                        ]
                    }
                }
            ]
        }
    ],
    "children": [
        {
            "id": "specifier",
            "type": "placeholder",
            "content": {
                "id": "b242f102a5acb495c9ffa0217b455712a",
                "x": 12,
                "y": 3,
                "color": "dodgerblue",
                "isRound": true,
                "words": [
                    {
                        "token": "I",
                        "categories": [
                            {
                                "head": {
                                    "type": {
                                        "type": "nominal",
                                        "isDet": true,
                                        "isTo": false,
                                        "isGerund": false,
                                        "isPron": true,
                                        "isProper": false
                                    },
                                    "case": "nom",
                                    "agr": {
                                        "type": "non-3sing",
                                        "per": 1,
                                        "num": "sing"
                                    }
                                },
                                "translationTemplates": {
                                    "default": [
                                        "私"
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        "token": "my",
                        "categories": [
                            {
                                "head": {
                                    "type": {
                                        "type": "nominal",
                                        "isDet": true,
                                        "isTo": false,
                                        "isGerund": false
                                    },
                                    "agr": {
                                        "per": 3
                                    },
                                    "determinered": true
                                },
                                "right": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal",
                                                "isDet": false,
                                                "isTo": false,
                                                "isGerund": false,
                                                "isPron": false,
                                                "isProper": false
                                            },
                                            "agr": {}
                                        }
                                    }
                                ],
                                "customUnification": [
                                    [
                                        [
                                            "head",
                                            "agr"
                                        ],
                                        [
                                            "right",
                                            0,
                                            "head",
                                            "agr"
                                        ]
                                    ]
                                ],
                                "translationTemplates": {
                                    "default": [
                                        "私の",
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default"
                                        }
                                    ]
                                }
                            },
                            {
                                "head": {
                                    "type": {
                                        "type": "nominal",
                                        "isDet": true,
                                        "isTo": false,
                                        "isGerund": false
                                    },
                                    "agr": {
                                        "type": "3sing"
                                    },
                                    "determinered": true
                                },
                                "right": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal",
                                                "isDet": true,
                                                "isTo": false,
                                                "isGerund": false
                                            }
                                        },
                                        "gaps": [
                                            {
                                                "head": {
                                                    "type": {
                                                        "type": "nominal",
                                                        "isDet": true,
                                                        "isTo": false,
                                                        "isGerund": false
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                ],
                                "translationTemplates": {
                                    "default": [
                                        "私が",
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default"
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        "token": "me",
                        "categories": [
                            {
                                "head": {
                                    "type": {
                                        "type": "nominal",
                                        "isDet": true,
                                        "isTo": false,
                                        "isGerund": false,
                                        "isPron": true,
                                        "isProper": false
                                    },
                                    "case": "acc",
                                    "agr": {
                                        "type": "non-3sing",
                                        "per": 1,
                                        "num": "sing"
                                    }
                                },
                                "translationTemplates": {
                                    "default": [
                                        "私"
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        "token": "mine",
                        "categories": [
                            {
                                "head": {
                                    "type": {
                                        "type": "nominal",
                                        "isDet": true,
                                        "isTo": false,
                                        "isGerund": false,
                                        "isPron": true,
                                        "isProper": false
                                    },
                                    "agr": {
                                        "per": 3,
                                        "num": "sing"
                                    }
                                },
                                "translationTemplates": {
                                    "default": [
                                        "私のもの"
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        "token": "myself",
                        "categories": [
                            {
                                "head": {
                                    "type": {
                                        "type": "nominal",
                                        "isDet": true,
                                        "isTo": false,
                                        "isGerund": false,
                                        "isPron": true,
                                        "isProper": false
                                    },
                                    "refl": true,
                                    "agr": {
                                        "type": "non-3sing",
                                        "per": 1,
                                        "num": "sing"
                                    }
                                },
                                "translationTemplates": {
                                    "default": [
                                        "私自身"
                                    ]
                                }
                            }
                        ]
                    }
                ],
                "children": [
                    {
                        "id": "head",
                        "type": "dropdown",
                        "content": [
                            "I",
                            "My",
                            "Me",
                            "Mine",
                            "Myself"
                        ],
                        "selected": 0,
                        "hidden": false,
                        "resolved": false
                    },
                    {
                        "id": "complement",
                        "type": "placeholder",
                        "content": null,
                        "hidden": true,
                        "headIndex": [
                            1
                        ],
                        "resolved": false,
                        "instanceId": "inst_22afac7e92834970a610939025f82ba2"
                    }
                ],
                "translation": "私"
            },
            "hidden": false,
            "resolved": false,
            "instanceId": "inst_fbe0c2ee121d446e9f60f25ebec2bede"
        },
        {
            "id": "head",
            "type": "text",
            "content": "",
            "hidden": false,
            "resolved": false
        },
        {
            "id": "complement",
            "type": "placeholder",
            "content": {
                "id": "b9f213ba0017a438ca9f464c781478eea",
                "x": 782,
                "y": 578,
                "words": [
                    {
                        "token": "like(base)",
                        "categories": [
                            {
                                "head": {
                                    "type": "verb",
                                    "tense": "present",
                                    "finite": true,
                                    "form": "base",
                                    "adv_manner_type": "degree"
                                },
                                "left": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal",
                                                "isDet": true,
                                                "isTo": false,
                                                "isGerund": false
                                            },
                                            "agr": {
                                                "type": "non-3sing"
                                            },
                                            "case": "nom",
                                            "isSubject": true
                                        }
                                    }
                                ],
                                "right": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal"
                                            },
                                            "case": "acc"
                                        }
                                    }
                                ],
                                "translationTemplates": {
                                    "default": [
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default",
                                            "particle": "が"
                                        },
                                        "好きである"
                                    ],
                                    "imperfective": [
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default",
                                            "particle": "が"
                                        },
                                        "好きで"
                                    ],
                                    "past": [
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default",
                                            "particle": "が"
                                        },
                                        "好きだった"
                                    ]
                                }
                            },
                            {
                                "head": {
                                    "type": "verb",
                                    "finite": false,
                                    "form": "base",
                                    "adv_manner_type": "degree"
                                },
                                "left": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal",
                                                "isDet": true
                                            }
                                        }
                                    }
                                ],
                                "right": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal"
                                            },
                                            "case": "acc"
                                        }
                                    }
                                ],
                                "translationTemplates": {
                                    "default": [
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default",
                                            "particle": "が"
                                        },
                                        "好きである"
                                    ],
                                    "imperfective": [
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default",
                                            "particle": "が"
                                        },
                                        "好きで"
                                    ],
                                    "past": [
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default",
                                            "particle": "が"
                                        },
                                        "好きだった"
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        "token": "likes(es)",
                        "categories": [
                            {
                                "head": {
                                    "type": "verb",
                                    "tense": "present",
                                    "finite": true,
                                    "form": "es",
                                    "adv_manner_type": "degree"
                                },
                                "left": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal",
                                                "isDet": true
                                            },
                                            "agr": {
                                                "type": "3sing"
                                            },
                                            "case": "nom"
                                        }
                                    }
                                ],
                                "right": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal"
                                            },
                                            "case": "acc"
                                        }
                                    }
                                ],
                                "translationTemplates": {
                                    "default": [
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default",
                                            "particle": "が"
                                        },
                                        "好きである"
                                    ],
                                    "imperfective": [
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default",
                                            "particle": "が"
                                        },
                                        "好きで"
                                    ],
                                    "past": [
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default",
                                            "particle": "が"
                                        },
                                        "好きだった"
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        "token": "liked(ed)",
                        "categories": [
                            {
                                "head": {
                                    "type": "verb",
                                    "tense": "past",
                                    "finite": true,
                                    "form": "ed",
                                    "adv_manner_type": "degree"
                                },
                                "left": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal",
                                                "isDet": true
                                            },
                                            "case": "nom"
                                        }
                                    }
                                ],
                                "right": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal"
                                            },
                                            "case": "acc"
                                        }
                                    }
                                ],
                                "translationTemplates": {
                                    "default": [
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default",
                                            "particle": "が"
                                        },
                                        "好きだった"
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        "token": "liked(perfect)",
                        "categories": [
                            {
                                "head": {
                                    "type": "verb",
                                    "finite": false,
                                    "form": "perfect",
                                    "adv_manner_type": "degree"
                                },
                                "left": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal",
                                                "isDet": true
                                            },
                                            "isSubject": true
                                        }
                                    }
                                ],
                                "right": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal"
                                            },
                                            "case": "acc"
                                        }
                                    }
                                ],
                                "translationTemplates": {
                                    "default": [
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default",
                                            "particle": "が"
                                        },
                                        "好きでいた"
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        "token": "liking(ing)",
                        "categories": [
                            {
                                "head": {
                                    "type": "verb",
                                    "finite": false,
                                    "form": "progressive",
                                    "adv_manner_type": "degree"
                                },
                                "left": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal",
                                                "isDet": true
                                            },
                                            "isSubject": true
                                        }
                                    }
                                ],
                                "right": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal"
                                            },
                                            "case": "acc"
                                        }
                                    }
                                ],
                                "translationTemplates": {
                                    "default": [
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default",
                                            "particle": "が"
                                        },
                                        "好きになっているところ"
                                    ],
                                    "nonPredicate": [
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default",
                                            "particle": "が"
                                        },
                                        "好きになっている"
                                    ]
                                }
                            },
                            {
                                "head": {
                                    "type": {
                                        "type": "nominal",
                                        "isGerund": true,
                                        "isSubject": true
                                    },
                                    "agr": {
                                        "type": "3sing"
                                    },
                                    "adv_manner_type": "degree"
                                },
                                "left": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal",
                                                "isDet": true
                                            }
                                        }
                                    }
                                ],
                                "right": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal"
                                            },
                                            "case": "acc"
                                        }
                                    }
                                ],
                                "translationTemplates": {
                                    "default": [
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default",
                                            "particle": "が"
                                        },
                                        "好きなこと"
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        "token": "liked(passive)",
                        "categories": [
                            {
                                "head": {
                                    "type": "verb",
                                    "finite": false,
                                    "form": "passive",
                                    "adv_manner_type": "degree"
                                },
                                "left": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal",
                                                "isDet": true
                                            },
                                            "isSubject": true
                                        }
                                    }
                                ],
                                "right": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal"
                                            },
                                            "case": "acc"
                                        }
                                    }
                                ],
                                "translationTemplates": {
                                    "default": [
                                        "好まれ"
                                    ]
                                }
                            }
                        ]
                    }
                ],
                "color": "tomato",
                "children": [
                    {
                        "id": "head",
                        "type": "dropdown",
                        "content": [
                            "like",
                            "likes",
                            "liked",
                            "liked",
                            "liking",
                            "liked"
                        ],
                        "selected": 0,
                        "hidden": false,
                        "resolved": false
                    },
                    {
                        "id": "complement-0",
                        "type": "placeholder",
                        "content": null,
                        "hidden": false,
                        "headIndex": [
                            0,
                            1,
                            2,
                            3,
                            4
                        ],
                        "resolved": false,
                        "instanceId": "inst_0cbfa83e1c5341a186103692fecd6a87"
                    }
                ],
                "isRound": true,
                "translation": "＿が好きである"
            },
            "hidden": false,
            "resolved": false,
            "instanceId": "inst_49f66dca837742f18ff3e00c635a856e"
        },
        {
            "id": "punctuation",
            "type": "text",
            "content": ".",
            "hidden": false
        }
    ],
    "isRound": false,
    "translation": "私は＿"
    }
    ```

3.  最後に、「なにを」にあたる目的語を置きます。「犬」なので、`dogs` のブロックを置けば完成です！
    ```sentence
    {
    "id": "",
    "x": 0,
    "y": 0,
    "color": "orange",
    "words": [
        {
            "token": "",
            "categories": [
                {
                    "head": {
                        "type": "sentence",
                        "finite": true,
                        "inverted": false,
                        "negative": false
                    },
                    "left": [
                        {
                            "head": {
                                "type": {
                                    "type": "nominal",
                                    "isDet": true
                                },
                                "case": "nom"
                            }
                        }
                    ],
                    "right": [
                        {
                            "head": {
                                "type": "verb",
                                "finite": true
                            },
                            "gaps": [
                                {
                                    "head": {
                                        "type": {
                                            "type": "nominal"
                                        },
                                        "case": "nom"
                                    }
                                }
                            ]
                        }
                    ],
                    "customUnification": [
                        [
                            [
                                "left",
                                0,
                                "head"
                            ],
                            [
                                "right",
                                0,
                                "gaps",
                                0,
                                "head"
                            ]
                        ]
                    ],
                    "translationTemplates": {
                        "default": [
                            {
                                "path": [
                                    "left",
                                    0
                                ],
                                "key": "default",
                                "particle": "は"
                            },
                            {
                                "path": [
                                    "right",
                                    0
                                ],
                                "key": "default"
                            }
                        ],
                        "nominal": [
                            {
                                "path": [
                                    "left",
                                    0
                                ],
                                "key": "default",
                                "particle": "が"
                            },
                            {
                                "path": [
                                    "right",
                                    0
                                ],
                                "key": "default"
                            }
                        ]
                    }
                }
            ]
        }
    ],
    "children": [
        {
            "id": "specifier",
            "type": "placeholder",
            "content": {
                "id": "b9c63340c49d24d99bff54bfa1f547db1",
                "x": 12,
                "y": 6,
                "color": "dodgerblue",
                "isRound": true,
                "words": [
                    {
                        "token": "I",
                        "categories": [
                            {
                                "head": {
                                    "type": {
                                        "type": "nominal",
                                        "isDet": true,
                                        "isTo": false,
                                        "isGerund": false,
                                        "isPron": true,
                                        "isProper": false
                                    },
                                    "case": "nom",
                                    "agr": {
                                        "type": "non-3sing",
                                        "per": 1,
                                        "num": "sing"
                                    }
                                },
                                "translationTemplates": {
                                    "default": [
                                        "私"
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        "token": "my",
                        "categories": [
                            {
                                "head": {
                                    "type": {
                                        "type": "nominal",
                                        "isDet": true,
                                        "isTo": false,
                                        "isGerund": false
                                    },
                                    "agr": {
                                        "per": 3
                                    },
                                    "determinered": true
                                },
                                "right": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal",
                                                "isDet": false,
                                                "isTo": false,
                                                "isGerund": false,
                                                "isPron": false,
                                                "isProper": false
                                            },
                                            "agr": {}
                                        }
                                    }
                                ],
                                "customUnification": [
                                    [
                                        [
                                            "head",
                                            "agr"
                                        ],
                                        [
                                            "right",
                                            0,
                                            "head",
                                            "agr"
                                        ]
                                    ]
                                ],
                                "translationTemplates": {
                                    "default": [
                                        "私の",
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default"
                                        }
                                    ]
                                }
                            },
                            {
                                "head": {
                                    "type": {
                                        "type": "nominal",
                                        "isDet": true,
                                        "isTo": false,
                                        "isGerund": false
                                    },
                                    "agr": {
                                        "type": "3sing"
                                    },
                                    "determinered": true
                                },
                                "right": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal",
                                                "isDet": true,
                                                "isTo": false,
                                                "isGerund": false
                                            }
                                        },
                                        "gaps": [
                                            {
                                                "head": {
                                                    "type": {
                                                        "type": "nominal",
                                                        "isDet": true,
                                                        "isTo": false,
                                                        "isGerund": false
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                ],
                                "translationTemplates": {
                                    "default": [
                                        "私が",
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default"
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        "token": "me",
                        "categories": [
                            {
                                "head": {
                                    "type": {
                                        "type": "nominal",
                                        "isDet": true,
                                        "isTo": false,
                                        "isGerund": false,
                                        "isPron": true,
                                        "isProper": false
                                    },
                                    "case": "acc",
                                    "agr": {
                                        "type": "non-3sing",
                                        "per": 1,
                                        "num": "sing"
                                    }
                                },
                                "translationTemplates": {
                                    "default": [
                                        "私"
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        "token": "mine",
                        "categories": [
                            {
                                "head": {
                                    "type": {
                                        "type": "nominal",
                                        "isDet": true,
                                        "isTo": false,
                                        "isGerund": false,
                                        "isPron": true,
                                        "isProper": false
                                    },
                                    "agr": {
                                        "per": 3,
                                        "num": "sing"
                                    }
                                },
                                "translationTemplates": {
                                    "default": [
                                        "私のもの"
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        "token": "myself",
                        "categories": [
                            {
                                "head": {
                                    "type": {
                                        "type": "nominal",
                                        "isDet": true,
                                        "isTo": false,
                                        "isGerund": false,
                                        "isPron": true,
                                        "isProper": false
                                    },
                                    "refl": true,
                                    "agr": {
                                        "type": "non-3sing",
                                        "per": 1,
                                        "num": "sing"
                                    }
                                },
                                "translationTemplates": {
                                    "default": [
                                        "私自身"
                                    ]
                                }
                            }
                        ]
                    }
                ],
                "children": [
                    {
                        "id": "head",
                        "type": "dropdown",
                        "content": [
                            "I",
                            "My",
                            "Me",
                            "Mine",
                            "Myself"
                        ],
                        "selected": 0,
                        "hidden": false,
                        "resolved": false
                    },
                    {
                        "id": "complement",
                        "type": "placeholder",
                        "content": null,
                        "hidden": true,
                        "headIndex": [
                            1
                        ],
                        "resolved": false,
                        "instanceId": "inst_749a753d390a4675a0f66fdab40d2f7b"
                    }
                ],
                "translation": "私"
            },
            "hidden": false,
            "resolved": false,
            "instanceId": "inst_c76a8710db924ac59535e8d5b1d63352"
        },
        {
            "id": "head",
            "type": "text",
            "content": "",
            "hidden": false,
            "resolved": false
        },
        {
            "id": "complement",
            "type": "placeholder",
            "content": {
                "id": "b88e777f029504f008d6db5e37c48cd42",
                "x": 143.6640625,
                "y": 3,
                "words": [
                    {
                        "token": "like(base)",
                        "categories": [
                            {
                                "head": {
                                    "type": "verb",
                                    "tense": "present",
                                    "finite": true,
                                    "form": "base",
                                    "adv_manner_type": "degree"
                                },
                                "left": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal",
                                                "isDet": true,
                                                "isTo": false,
                                                "isGerund": false
                                            },
                                            "agr": {
                                                "type": "non-3sing"
                                            },
                                            "case": "nom",
                                            "isSubject": true
                                        }
                                    }
                                ],
                                "right": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal"
                                            },
                                            "case": "acc"
                                        }
                                    }
                                ],
                                "translationTemplates": {
                                    "default": [
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default",
                                            "particle": "が"
                                        },
                                        "好きである"
                                    ],
                                    "imperfective": [
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default",
                                            "particle": "が"
                                        },
                                        "好きで"
                                    ],
                                    "past": [
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default",
                                            "particle": "が"
                                        },
                                        "好きだった"
                                    ]
                                }
                            },
                            {
                                "head": {
                                    "type": "verb",
                                    "finite": false,
                                    "form": "base",
                                    "adv_manner_type": "degree"
                                },
                                "left": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal",
                                                "isDet": true
                                            }
                                        }
                                    }
                                ],
                                "right": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal"
                                            },
                                            "case": "acc"
                                        }
                                    }
                                ],
                                "translationTemplates": {
                                    "default": [
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default",
                                            "particle": "が"
                                        },
                                        "好きである"
                                    ],
                                    "imperfective": [
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default",
                                            "particle": "が"
                                        },
                                        "好きで"
                                    ],
                                    "past": [
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default",
                                            "particle": "が"
                                        },
                                        "好きだった"
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        "token": "likes(es)",
                        "categories": [
                            {
                                "head": {
                                    "type": "verb",
                                    "tense": "present",
                                    "finite": true,
                                    "form": "es",
                                    "adv_manner_type": "degree"
                                },
                                "left": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal",
                                                "isDet": true
                                            },
                                            "agr": {
                                                "type": "3sing"
                                            },
                                            "case": "nom"
                                        }
                                    }
                                ],
                                "right": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal"
                                            },
                                            "case": "acc"
                                        }
                                    }
                                ],
                                "translationTemplates": {
                                    "default": [
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default",
                                            "particle": "が"
                                        },
                                        "好きである"
                                    ],
                                    "imperfective": [
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default",
                                            "particle": "が"
                                        },
                                        "好きで"
                                    ],
                                    "past": [
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default",
                                            "particle": "が"
                                        },
                                        "好きだった"
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        "token": "liked(ed)",
                        "categories": [
                            {
                                "head": {
                                    "type": "verb",
                                    "tense": "past",
                                    "finite": true,
                                    "form": "ed",
                                    "adv_manner_type": "degree"
                                },
                                "left": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal",
                                                "isDet": true
                                            },
                                            "case": "nom"
                                        }
                                    }
                                ],
                                "right": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal"
                                            },
                                            "case": "acc"
                                        }
                                    }
                                ],
                                "translationTemplates": {
                                    "default": [
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default",
                                            "particle": "が"
                                        },
                                        "好きだった"
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        "token": "liked(perfect)",
                        "categories": [
                            {
                                "head": {
                                    "type": "verb",
                                    "finite": false,
                                    "form": "perfect",
                                    "adv_manner_type": "degree"
                                },
                                "left": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal",
                                                "isDet": true
                                            },
                                            "isSubject": true
                                        }
                                    }
                                ],
                                "right": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal"
                                            },
                                            "case": "acc"
                                        }
                                    }
                                ],
                                "translationTemplates": {
                                    "default": [
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default",
                                            "particle": "が"
                                        },
                                        "好きでいた"
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        "token": "liking(ing)",
                        "categories": [
                            {
                                "head": {
                                    "type": "verb",
                                    "finite": false,
                                    "form": "progressive",
                                    "adv_manner_type": "degree"
                                },
                                "left": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal",
                                                "isDet": true
                                            },
                                            "isSubject": true
                                        }
                                    }
                                ],
                                "right": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal"
                                            },
                                            "case": "acc"
                                        }
                                    }
                                ],
                                "translationTemplates": {
                                    "default": [
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default",
                                            "particle": "が"
                                        },
                                        "好きになっているところ"
                                    ],
                                    "nonPredicate": [
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default",
                                            "particle": "が"
                                        },
                                        "好きになっている"
                                    ]
                                }
                            },
                            {
                                "head": {
                                    "type": {
                                        "type": "nominal",
                                        "isGerund": true,
                                        "isSubject": true
                                    },
                                    "agr": {
                                        "type": "3sing"
                                    },
                                    "adv_manner_type": "degree"
                                },
                                "left": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal",
                                                "isDet": true
                                            }
                                        }
                                    }
                                ],
                                "right": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal"
                                            },
                                            "case": "acc"
                                        }
                                    }
                                ],
                                "translationTemplates": {
                                    "default": [
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default",
                                            "particle": "が"
                                        },
                                        "好きなこと"
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        "token": "liked(passive)",
                        "categories": [
                            {
                                "head": {
                                    "type": "verb",
                                    "finite": false,
                                    "form": "passive",
                                    "adv_manner_type": "degree"
                                },
                                "left": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal",
                                                "isDet": true
                                            },
                                            "isSubject": true
                                        }
                                    }
                                ],
                                "right": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal"
                                            },
                                            "case": "acc"
                                        }
                                    }
                                ],
                                "translationTemplates": {
                                    "default": [
                                        "好まれ"
                                    ]
                                }
                            }
                        ]
                    }
                ],
                "color": "tomato",
                "children": [
                    {
                        "id": "head",
                        "type": "dropdown",
                        "content": [
                            "like",
                            "likes",
                            "liked",
                            "liked",
                            "liking",
                            "liked"
                        ],
                        "selected": 0,
                        "hidden": false,
                        "resolved": false
                    },
                    {
                        "id": "complement-0",
                        "type": "placeholder",
                        "content": {
                            "id": "bcef16dc86a8648b2a464cc3e46d7ac49",
                            "x": 976,
                            "y": 514,
                            "color": "dodgerblue",
                            "isRound": true,
                            "words": [
                                {
                                    "token": "dog",
                                    "categories": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": false,
                                                    "isTo": false,
                                                    "isGerund": false,
                                                    "isPron": false,
                                                    "isProper": false
                                                },
                                                "agr": {
                                                    "type": "3sing"
                                                }
                                            },
                                            "translationTemplates": {
                                                "default": [
                                                    "犬"
                                                ]
                                            }
                                        }
                                    ]
                                },
                                {
                                    "token": "dogs",
                                    "categories": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true,
                                                    "isTo": false,
                                                    "isGerund": false
                                                },
                                                "agr": {
                                                    "type": "non-3sing",
                                                    "num": "pl",
                                                    "per": 3
                                                }
                                            },
                                            "translationTemplates": {
                                                "default": [
                                                    "犬"
                                                ]
                                            }
                                        },
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": false,
                                                    "isTo": false,
                                                    "isGerund": false,
                                                    "isPron": false,
                                                    "isProper": false
                                                },
                                                "agr": {
                                                    "type": "non-3sing",
                                                    "num": "pl",
                                                    "per": 3
                                                }
                                            },
                                            "translationTemplates": {
                                                "default": [
                                                    "犬"
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ],
                            "children": [
                                {
                                    "id": "head",
                                    "type": "dropdown",
                                    "content": [
                                        "dog",
                                        "dogs"
                                    ],
                                    "selected": 1,
                                    "hidden": false,
                                    "resolved": false
                                }
                            ],
                            "translation": "犬"
                        },
                        "hidden": false,
                        "headIndex": [
                            0,
                            1,
                            2,
                            3,
                            4
                        ],
                        "resolved": false,
                        "instanceId": "inst_627f8448df7a4b5eaae34648c216a94a"
                    }
                ],
                "isRound": true,
                "translation": "＿が好きである"
            },
            "hidden": false,
            "resolved": false,
            "instanceId": "inst_8f33129173744f56a42de8b9c90e1f74"
        },
        {
            "id": "punctuation",
            "type": "text",
            "content": ".",
            "hidden": false
        }
    ],
    "isRound": false,
    "translation": "私は＿が好きである"
    }
    ```

これで、自分の好きなものを伝える基本的な文ができました。この「主語 → 動詞 → 目的語」の順番は、英語のとても大切なルールです。

## 練習

1.  **文をまねて作ってみよう**
    *   「私は猫が好きです。」
        ```sentence
        {
        "id": "",
        "x": 0,
        "y": 0,
        "color": "orange",
        "words": [
        {
            "token": "",
            "categories": [
                {
                    "head": {
                        "type": "sentence",
                        "finite": true,
                        "inverted": false,
                        "negative": false
                    },
                    "left": [
                        {
                            "head": {
                                "type": {
                                    "type": "nominal",
                                    "isDet": true
                                },
                                "case": "nom"
                            }
                        }
                    ],
                    "right": [
                        {
                            "head": {
                                "type": "verb",
                                "finite": true
                            },
                            "gaps": [
                                {
                                    "head": {
                                        "type": {
                                            "type": "nominal"
                                        },
                                        "case": "nom"
                                    }
                                }
                            ]
                        }
                    ],
                    "customUnification": [
                        [
                            [
                                "left",
                                0,
                                "head"
                            ],
                            [
                                "right",
                                0,
                                "gaps",
                                0,
                                "head"
                            ]
                        ]
                    ],
                    "translationTemplates": {
                        "default": [
                            {
                                "path": [
                                    "left",
                                    0
                                ],
                                "key": "default",
                                "particle": "は"
                            },
                            {
                                "path": [
                                    "right",
                                    0
                                ],
                                "key": "default"
                            }
                        ],
                        "nominal": [
                            {
                                "path": [
                                    "left",
                                    0
                                ],
                                "key": "default",
                                "particle": "が"
                            },
                            {
                                "path": [
                                    "right",
                                    0
                                ],
                                "key": "default"
                            }
                        ]
                    }
                }
            ]
        }
        ],
        "children": [
            {
                "id": "specifier",
                "type": "placeholder",
                "content": {
                    "id": "b352dfae982b4483a820ca5511cd067e8",
                    "x": 12,
                    "y": 6,
                    "color": "dodgerblue",
                    "isRound": true,
                    "words": [
                        {
                            "token": "I",
                            "categories": [
                                {
                                    "head": {
                                        "type": {
                                            "type": "nominal",
                                            "isDet": true,
                                            "isTo": false,
                                            "isGerund": false,
                                            "isPron": true,
                                            "isProper": false
                                        },
                                        "case": "nom",
                                        "agr": {
                                            "type": "non-3sing",
                                            "per": 1,
                                            "num": "sing"
                                        }
                                    },
                                    "translationTemplates": {
                                        "default": [
                                            "私"
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "token": "my",
                            "categories": [
                                {
                                    "head": {
                                        "type": {
                                            "type": "nominal",
                                            "isDet": true,
                                            "isTo": false,
                                            "isGerund": false
                                        },
                                        "agr": {
                                            "per": 3
                                        },
                                        "determinered": true
                                    },
                                    "right": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": false,
                                                    "isTo": false,
                                                    "isGerund": false,
                                                    "isPron": false,
                                                    "isProper": false
                                                },
                                                "agr": {}
                                            }
                                        }
                                    ],
                                    "customUnification": [
                                        [
                                            [
                                                "head",
                                                "agr"
                                            ],
                                            [
                                                "right",
                                                0,
                                                "head",
                                                "agr"
                                            ]
                                        ]
                                    ],
                                    "translationTemplates": {
                                        "default": [
                                            "私の",
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "head": {
                                        "type": {
                                            "type": "nominal",
                                            "isDet": true,
                                            "isTo": false,
                                            "isGerund": false
                                        },
                                        "agr": {
                                            "type": "3sing"
                                        },
                                        "determinered": true
                                    },
                                    "right": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true,
                                                    "isTo": false,
                                                    "isGerund": false
                                                }
                                            },
                                            "gaps": [
                                                {
                                                    "head": {
                                                        "type": {
                                                            "type": "nominal",
                                                            "isDet": true,
                                                            "isTo": false,
                                                            "isGerund": false
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ],
                                    "translationTemplates": {
                                        "default": [
                                            "私が",
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default"
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "token": "me",
                            "categories": [
                                {
                                    "head": {
                                        "type": {
                                            "type": "nominal",
                                            "isDet": true,
                                            "isTo": false,
                                            "isGerund": false,
                                            "isPron": true,
                                            "isProper": false
                                        },
                                        "case": "acc",
                                        "agr": {
                                            "type": "non-3sing",
                                            "per": 1,
                                            "num": "sing"
                                        }
                                    },
                                    "translationTemplates": {
                                        "default": [
                                            "私"
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "token": "mine",
                            "categories": [
                                {
                                    "head": {
                                        "type": {
                                            "type": "nominal",
                                            "isDet": true,
                                            "isTo": false,
                                            "isGerund": false,
                                            "isPron": true,
                                            "isProper": false
                                        },
                                        "agr": {
                                            "per": 3,
                                            "num": "sing"
                                        }
                                    },
                                    "translationTemplates": {
                                        "default": [
                                            "私のもの"
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "token": "myself",
                            "categories": [
                                {
                                    "head": {
                                        "type": {
                                            "type": "nominal",
                                            "isDet": true,
                                            "isTo": false,
                                            "isGerund": false,
                                            "isPron": true,
                                            "isProper": false
                                        },
                                        "refl": true,
                                        "agr": {
                                            "type": "non-3sing",
                                            "per": 1,
                                            "num": "sing"
                                        }
                                    },
                                    "translationTemplates": {
                                        "default": [
                                            "私自身"
                                        ]
                                    }
                                }
                            ]
                        }
                    ],
                    "children": [
                        {
                            "id": "head",
                            "type": "dropdown",
                            "content": [
                                "I",
                                "My",
                                "Me",
                                "Mine",
                                "Myself"
                            ],
                            "selected": 0,
                            "hidden": false,
                            "resolved": false
                        },
                        {
                            "id": "complement",
                            "type": "placeholder",
                            "content": null,
                            "hidden": true,
                            "headIndex": [
                                1
                            ],
                            "resolved": false,
                            "instanceId": "inst_75a61879c0c94da287e3f4cc2e38d87c"
                        }
                    ],
                    "translation": "私"
                },
                "hidden": false,
                "resolved": false,
                "instanceId": "inst_85d26f918504422a8ce20147892502e6"
            },
            {
                "id": "head",
                "type": "text",
                "content": "",
                "hidden": false,
                "resolved": false
            },
            {
                "id": "complement",
                "type": "placeholder",
                "content": {
                    "id": "bb4b28b4e14624427ad3a46ec34f3132d",
                    "x": 143.6640625,
                    "y": 3,
                    "words": [
                        {
                            "token": "like(base)",
                            "categories": [
                                {
                                    "head": {
                                        "type": "verb",
                                        "tense": "present",
                                        "finite": true,
                                        "form": "base",
                                        "adv_manner_type": "degree"
                                    },
                                    "left": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true,
                                                    "isTo": false,
                                                    "isGerund": false
                                                },
                                                "agr": {
                                                    "type": "non-3sing"
                                                },
                                                "case": "nom",
                                                "isSubject": true
                                            }
                                        }
                                    ],
                                    "right": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal"
                                                },
                                                "case": "acc"
                                            }
                                        }
                                    ],
                                    "translationTemplates": {
                                        "default": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "が"
                                            },
                                            "好きである"
                                        ],
                                        "imperfective": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "が"
                                            },
                                            "好きで"
                                        ],
                                        "past": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "が"
                                            },
                                            "好きだった"
                                        ]
                                    }
                                },
                                {
                                    "head": {
                                        "type": "verb",
                                        "finite": false,
                                        "form": "base",
                                        "adv_manner_type": "degree"
                                    },
                                    "left": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true
                                                }
                                            }
                                        }
                                    ],
                                    "right": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal"
                                                },
                                                "case": "acc"
                                            }
                                        }
                                    ],
                                    "translationTemplates": {
                                        "default": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "が"
                                            },
                                            "好きである"
                                        ],
                                        "imperfective": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "が"
                                            },
                                            "好きで"
                                        ],
                                        "past": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "が"
                                            },
                                            "好きだった"
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "token": "likes(es)",
                            "categories": [
                                {
                                    "head": {
                                        "type": "verb",
                                        "tense": "present",
                                        "finite": true,
                                        "form": "es",
                                        "adv_manner_type": "degree"
                                    },
                                    "left": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true
                                                },
                                                "agr": {
                                                    "type": "3sing"
                                                },
                                                "case": "nom"
                                            }
                                        }
                                    ],
                                    "right": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal"
                                                },
                                                "case": "acc"
                                            }
                                        }
                                    ],
                                    "translationTemplates": {
                                        "default": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "が"
                                            },
                                            "好きである"
                                        ],
                                        "imperfective": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "が"
                                            },
                                            "好きで"
                                        ],
                                        "past": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "が"
                                            },
                                            "好きだった"
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "token": "liked(ed)",
                            "categories": [
                                {
                                    "head": {
                                        "type": "verb",
                                        "tense": "past",
                                        "finite": true,
                                        "form": "ed",
                                        "adv_manner_type": "degree"
                                    },
                                    "left": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true
                                                },
                                                "case": "nom"
                                            }
                                        }
                                    ],
                                    "right": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal"
                                                },
                                                "case": "acc"
                                            }
                                        }
                                    ],
                                    "translationTemplates": {
                                        "default": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "が"
                                            },
                                            "好きだった"
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "token": "liked(perfect)",
                            "categories": [
                                {
                                    "head": {
                                        "type": "verb",
                                        "finite": false,
                                        "form": "perfect",
                                        "adv_manner_type": "degree"
                                    },
                                    "left": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true
                                                },
                                                "isSubject": true
                                            }
                                        }
                                    ],
                                    "right": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal"
                                                },
                                                "case": "acc"
                                            }
                                        }
                                    ],
                                    "translationTemplates": {
                                        "default": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "が"
                                            },
                                            "好きでいた"
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "token": "liking(ing)",
                            "categories": [
                                {
                                    "head": {
                                        "type": "verb",
                                        "finite": false,
                                        "form": "progressive",
                                        "adv_manner_type": "degree"
                                    },
                                    "left": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true
                                                },
                                                "isSubject": true
                                            }
                                        }
                                    ],
                                    "right": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal"
                                                },
                                                "case": "acc"
                                            }
                                        }
                                    ],
                                    "translationTemplates": {
                                        "default": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "が"
                                            },
                                            "好きになっているところ"
                                        ],
                                        "nonPredicate": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "が"
                                            },
                                            "好きになっている"
                                        ]
                                    }
                                },
                                {
                                    "head": {
                                        "type": {
                                            "type": "nominal",
                                            "isGerund": true,
                                            "isSubject": true
                                        },
                                        "agr": {
                                            "type": "3sing"
                                        },
                                        "adv_manner_type": "degree"
                                    },
                                    "left": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true
                                                }
                                            }
                                        }
                                    ],
                                    "right": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal"
                                                },
                                                "case": "acc"
                                            }
                                        }
                                    ],
                                    "translationTemplates": {
                                        "default": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "が"
                                            },
                                            "好きなこと"
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "token": "liked(passive)",
                            "categories": [
                                {
                                    "head": {
                                        "type": "verb",
                                        "finite": false,
                                        "form": "passive",
                                        "adv_manner_type": "degree"
                                    },
                                    "left": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true
                                                },
                                                "isSubject": true
                                            }
                                        }
                                    ],
                                    "right": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal"
                                                },
                                                "case": "acc"
                                            }
                                        }
                                    ],
                                    "translationTemplates": {
                                        "default": [
                                            "好まれ"
                                        ]
                                    }
                                }
                            ]
                        }
                    ],
                    "color": "tomato",
                    "children": [
                        {
                            "id": "head",
                            "type": "dropdown",
                            "content": [
                                "like",
                                "likes",
                                "liked",
                                "liked",
                                "liking",
                                "liked"
                            ],
                            "selected": 0,
                            "hidden": false,
                            "resolved": false
                        },
                        {
                            "id": "complement-0",
                            "type": "placeholder",
                            "content": {
                                "id": "bacf067c7e1d54d26b91f6637af24c610",
                                "x": 904.2677612304688,
                                "y": 479.4444580078125,
                                "color": "dodgerblue",
                                "isRound": true,
                                "words": [
                                    {
                                        "token": "cat",
                                        "categories": [
                                            {
                                                "head": {
                                                    "type": {
                                                        "type": "nominal",
                                                        "isDet": false,
                                                        "isTo": false,
                                                        "isGerund": false,
                                                        "isPron": false,
                                                        "isProper": false
                                                    },
                                                    "agr": {
                                                        "type": "3sing"
                                                    }
                                                },
                                                "translationTemplates": {
                                                    "default": [
                                                        "猫"
                                                    ]
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        "token": "cats",
                                        "categories": [
                                            {
                                                "head": {
                                                    "type": {
                                                        "type": "nominal",
                                                        "isDet": true,
                                                        "isTo": false,
                                                        "isGerund": false
                                                    },
                                                    "agr": {
                                                        "type": "non-3sing",
                                                        "num": "pl",
                                                        "per": 3
                                                    }
                                                },
                                                "translationTemplates": {
                                                    "default": [
                                                        "猫"
                                                    ]
                                                }
                                            },
                                            {
                                                "head": {
                                                    "type": {
                                                        "type": "nominal",
                                                        "isDet": false,
                                                        "isTo": false,
                                                        "isGerund": false,
                                                        "isPron": false,
                                                        "isProper": false
                                                    },
                                                    "agr": {
                                                        "type": "non-3sing",
                                                        "num": "pl",
                                                        "per": 3
                                                    }
                                                },
                                                "translationTemplates": {
                                                    "default": [
                                                        "猫"
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                ],
                                "children": [
                                    {
                                        "id": "head",
                                        "type": "dropdown",
                                        "content": [
                                            "cat",
                                            "cats"
                                        ],
                                        "selected": 1,
                                        "hidden": false,
                                        "resolved": false
                                    }
                                ],
                                "translation": "猫"
                            },
                            "hidden": false,
                            "headIndex": [
                                0,
                                1,
                                2,
                                3,
                                4
                            ],
                            "resolved": false,
                            "instanceId": "inst_6ef940f19b3143f680abf050a56eac96"
                        }
                    ],
                    "isRound": true,
                    "translation": "＿が好きである"
                },
                "hidden": false,
                "resolved": false,
                "instanceId": "inst_5963f19a018e462b977eed480b3bdd07"
            },
            {
                "id": "punctuation",
                "type": "text",
                "content": ".",
                "hidden": false
            }
        ],
        "isRound": false,
        "translation": "私は＿が好きである"
        }
        ```
    *   「私はペンを持っています。」
        ```sentence
        {
        "id": "",
        "x": 0,
        "y": 0,
        "color": "orange",
        "words": [
            {
                "token": "",
                "categories": [
                    {
                        "head": {
                            "type": "sentence",
                            "finite": true,
                            "inverted": false,
                            "negative": false
                        },
                        "left": [
                            {
                                "head": {
                                    "type": {
                                        "type": "nominal",
                                        "isDet": true
                                    },
                                    "case": "nom"
                                }
                            }
                        ],
                        "right": [
                            {
                                "head": {
                                    "type": "verb",
                                    "finite": true
                                },
                                "gaps": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal"
                                            },
                                            "case": "nom"
                                        }
                                    }
                                ]
                            }
                        ],
                        "customUnification": [
                            [
                                [
                                    "left",
                                    0,
                                    "head"
                                ],
                                [
                                    "right",
                                    0,
                                    "gaps",
                                    0,
                                    "head"
                                ]
                            ]
                        ],
                        "translationTemplates": {
                            "default": [
                                {
                                    "path": [
                                        "left",
                                        0
                                    ],
                                    "key": "default",
                                    "particle": "は"
                                },
                                {
                                    "path": [
                                        "right",
                                        0
                                    ],
                                    "key": "default"
                                }
                            ],
                            "nominal": [
                                {
                                    "path": [
                                        "left",
                                        0
                                    ],
                                    "key": "default",
                                    "particle": "が"
                                },
                                {
                                    "path": [
                                        "right",
                                        0
                                    ],
                                    "key": "default"
                                }
                            ]
                        }
                    }
                ]
            }
        ],
        "children": [
            {
                "id": "specifier",
                "type": "placeholder",
                "content": {
                    "id": "beb7274b26eb44ebab47c91b13870b9d9",
                    "x": 12,
                    "y": 9,
                    "color": "dodgerblue",
                    "isRound": true,
                    "words": [
                        {
                            "token": "I",
                            "categories": [
                                {
                                    "head": {
                                        "type": {
                                            "type": "nominal",
                                            "isDet": true,
                                            "isTo": false,
                                            "isGerund": false,
                                            "isPron": true,
                                            "isProper": false
                                        },
                                        "case": "nom",
                                        "agr": {
                                            "type": "non-3sing",
                                            "per": 1,
                                            "num": "sing"
                                        }
                                    },
                                    "translationTemplates": {
                                        "default": [
                                            "私"
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "token": "my",
                            "categories": [
                                {
                                    "head": {
                                        "type": {
                                            "type": "nominal",
                                            "isDet": true,
                                            "isTo": false,
                                            "isGerund": false
                                        },
                                        "agr": {
                                            "per": 3
                                        },
                                        "determinered": true
                                    },
                                    "right": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": false,
                                                    "isTo": false,
                                                    "isGerund": false,
                                                    "isPron": false,
                                                    "isProper": false
                                                },
                                                "agr": {}
                                            }
                                        }
                                    ],
                                    "customUnification": [
                                        [
                                            [
                                                "head",
                                                "agr"
                                            ],
                                            [
                                                "right",
                                                0,
                                                "head",
                                                "agr"
                                            ]
                                        ]
                                    ],
                                    "translationTemplates": {
                                        "default": [
                                            "私の",
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "head": {
                                        "type": {
                                            "type": "nominal",
                                            "isDet": true,
                                            "isTo": false,
                                            "isGerund": false
                                        },
                                        "agr": {
                                            "type": "3sing"
                                        },
                                        "determinered": true
                                    },
                                    "right": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true,
                                                    "isTo": false,
                                                    "isGerund": false
                                                }
                                            },
                                            "gaps": [
                                                {
                                                    "head": {
                                                        "type": {
                                                            "type": "nominal",
                                                            "isDet": true,
                                                            "isTo": false,
                                                            "isGerund": false
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ],
                                    "translationTemplates": {
                                        "default": [
                                            "私が",
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default"
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "token": "me",
                            "categories": [
                                {
                                    "head": {
                                        "type": {
                                            "type": "nominal",
                                            "isDet": true,
                                            "isTo": false,
                                            "isGerund": false,
                                            "isPron": true,
                                            "isProper": false
                                        },
                                        "case": "acc",
                                        "agr": {
                                            "type": "non-3sing",
                                            "per": 1,
                                            "num": "sing"
                                        }
                                    },
                                    "translationTemplates": {
                                        "default": [
                                            "私"
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "token": "mine",
                            "categories": [
                                {
                                    "head": {
                                        "type": {
                                            "type": "nominal",
                                            "isDet": true,
                                            "isTo": false,
                                            "isGerund": false,
                                            "isPron": true,
                                            "isProper": false
                                        },
                                        "agr": {
                                            "per": 3,
                                            "num": "sing"
                                        }
                                    },
                                    "translationTemplates": {
                                        "default": [
                                            "私のもの"
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "token": "myself",
                            "categories": [
                                {
                                    "head": {
                                        "type": {
                                            "type": "nominal",
                                            "isDet": true,
                                            "isTo": false,
                                            "isGerund": false,
                                            "isPron": true,
                                            "isProper": false
                                        },
                                        "refl": true,
                                        "agr": {
                                            "type": "non-3sing",
                                            "per": 1,
                                            "num": "sing"
                                        }
                                    },
                                    "translationTemplates": {
                                        "default": [
                                            "私自身"
                                        ]
                                    }
                                }
                            ]
                        }
                    ],
                    "children": [
                        {
                            "id": "head",
                            "type": "dropdown",
                            "content": [
                                "I",
                                "My",
                                "Me",
                                "Mine",
                                "Myself"
                            ],
                            "selected": 0,
                            "hidden": false,
                            "resolved": false
                        },
                        {
                            "id": "complement",
                            "type": "placeholder",
                            "content": null,
                            "hidden": true,
                            "headIndex": [
                                1
                            ],
                            "resolved": false,
                            "instanceId": "inst_dd77d6d8555549799459cdc3d6b14a30"
                        }
                    ],
                    "translation": "私"
                },
                "hidden": false,
                "resolved": false,
                "instanceId": "inst_136fa8fa47644f3fa2d3af7c5295ed6b"
            },
            {
                "id": "head",
                "type": "text",
                "content": "",
                "hidden": false,
                "resolved": false
            },
            {
                "id": "complement",
                "type": "placeholder",
                "content": {
                    "id": "bfbf5f464e8964ec5957b100ed9dc7f83",
                    "x": 143.6640625,
                    "y": 3,
                    "words": [
                        {
                            "token": "have(base)",
                            "categories": [
                                {
                                    "head": {
                                        "type": "verb",
                                        "tense": "present",
                                        "finite": true,
                                        "form": "base",
                                        "adv_manner_type": "none"
                                    },
                                    "left": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true,
                                                    "isTo": false,
                                                    "isGerund": false
                                                },
                                                "agr": {
                                                    "type": "non-3sing"
                                                },
                                                "case": "nom",
                                                "isSubject": true
                                            }
                                        }
                                    ],
                                    "right": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true,
                                                    "isTo": false,
                                                    "isGerund": false
                                                },
                                                "case": "acc"
                                            }
                                        }
                                    ],
                                    "translationTemplates": {
                                        "default": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "を"
                                            },
                                            "持っている"
                                        ],
                                        "imperfective": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "を"
                                            },
                                            "持ってい"
                                        ],
                                        "past": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "を"
                                            },
                                            "持っていた"
                                        ]
                                    }
                                },
                                {
                                    "head": {
                                        "type": "verb",
                                        "finite": false,
                                        "form": "base",
                                        "adv_manner_type": "none"
                                    },
                                    "left": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true,
                                                    "isGerund": false,
                                                    "isTo": false
                                                }
                                            }
                                        }
                                    ],
                                    "right": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true,
                                                    "isTo": false,
                                                    "isGerund": false
                                                },
                                                "case": "acc"
                                            }
                                        }
                                    ],
                                    "translationTemplates": {
                                        "default": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "を"
                                            },
                                            "持っている"
                                        ],
                                        "imperfective": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "を"
                                            },
                                            "持ってい"
                                        ],
                                        "past": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "を"
                                            },
                                            "持っていた"
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "token": "has(es)",
                            "categories": [
                                {
                                    "head": {
                                        "type": "verb",
                                        "tense": "present",
                                        "finite": true,
                                        "form": "es",
                                        "adv_manner_type": "none"
                                    },
                                    "left": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true,
                                                    "isGerund": false,
                                                    "isTo": false
                                                },
                                                "agr": {
                                                    "type": "3sing"
                                                },
                                                "case": "nom"
                                            }
                                        }
                                    ],
                                    "right": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true,
                                                    "isTo": false,
                                                    "isGerund": false
                                                },
                                                "case": "acc"
                                            }
                                        }
                                    ],
                                    "translationTemplates": {
                                        "default": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "を"
                                            },
                                            "持っている"
                                        ],
                                        "imperfective": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "を"
                                            },
                                            "持ってい"
                                        ],
                                        "past": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "を"
                                            },
                                            "持っていた"
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "token": "had(ed)",
                            "categories": [
                                {
                                    "head": {
                                        "type": "verb",
                                        "tense": "past",
                                        "finite": true,
                                        "form": "ed",
                                        "adv_manner_type": "none"
                                    },
                                    "left": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true,
                                                    "isGerund": false,
                                                    "isTo": false
                                                },
                                                "case": "nom"
                                            }
                                        }
                                    ],
                                    "right": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true,
                                                    "isTo": false,
                                                    "isGerund": false
                                                },
                                                "case": "acc"
                                            }
                                        }
                                    ],
                                    "translationTemplates": {
                                        "default": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "を"
                                            },
                                            "持っていた"
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "token": "had(perfect)",
                            "categories": [
                                {
                                    "head": {
                                        "type": "verb",
                                        "finite": false,
                                        "form": "perfect",
                                        "adv_manner_type": "none"
                                    },
                                    "left": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true,
                                                    "isGerund": false,
                                                    "isTo": false
                                                },
                                                "isSubject": true
                                            }
                                        }
                                    ],
                                    "right": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true,
                                                    "isTo": false,
                                                    "isGerund": false
                                                },
                                                "case": "acc"
                                            }
                                        }
                                    ],
                                    "translationTemplates": {
                                        "default": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "を"
                                            },
                                            "既に持ってい"
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "token": "having(ing)",
                            "categories": [
                                {
                                    "head": {
                                        "type": "verb",
                                        "finite": false,
                                        "form": "progressive",
                                        "adv_manner_type": "none"
                                    },
                                    "left": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true,
                                                    "isGerund": false,
                                                    "isTo": false
                                                },
                                                "isSubject": true
                                            }
                                        }
                                    ],
                                    "right": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true,
                                                    "isTo": false,
                                                    "isGerund": false
                                                },
                                                "case": "acc"
                                            }
                                        }
                                    ],
                                    "translationTemplates": {
                                        "default": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "を"
                                            },
                                            "持っているところ"
                                        ],
                                        "nonPredicate": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "を"
                                            },
                                            "持っている"
                                        ]
                                    }
                                },
                                {
                                    "head": {
                                        "type": {
                                            "type": "nominal",
                                            "isGerund": true,
                                            "isSubject": true
                                        },
                                        "agr": {
                                            "type": "3sing"
                                        },
                                        "adv_manner_type": "none"
                                    },
                                    "left": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true,
                                                    "isGerund": false,
                                                    "isTo": false
                                                }
                                            }
                                        }
                                    ],
                                    "right": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true,
                                                    "isTo": false,
                                                    "isGerund": false
                                                },
                                                "case": "acc"
                                            }
                                        }
                                    ],
                                    "translationTemplates": {
                                        "default": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "を"
                                            },
                                            "持っていること"
                                        ],
                                        "no": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "を"
                                            },
                                            "持っているの"
                                        ],
                                        "past": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "を"
                                            },
                                            "持っていたこと"
                                        ],
                                        "pastNo": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "を"
                                            },
                                            "持っていたの"
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "token": "had(passive)",
                            "categories": [
                                {
                                    "head": {
                                        "type": "verb",
                                        "finite": false,
                                        "form": "passive",
                                        "adv_manner_type": "none"
                                    },
                                    "left": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true,
                                                    "isGerund": false,
                                                    "isTo": false
                                                },
                                                "isSubject": true
                                            }
                                        }
                                    ],
                                    "right": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true,
                                                    "isTo": false,
                                                    "isGerund": false
                                                },
                                                "case": "acc"
                                            }
                                        }
                                    ],
                                    "translationTemplates": {
                                        "default": [
                                            "所有されてい"
                                        ]
                                    }
                                }
                            ]
                        }
                    ],
                    "color": "tomato",
                    "children": [
                        {
                            "id": "head",
                            "type": "dropdown",
                            "content": [
                                "have",
                                "has",
                                "had",
                                "had",
                                "having",
                                "had"
                            ],
                            "selected": 0,
                            "hidden": false,
                            "resolved": false
                        },
                        {
                            "id": "complement-0",
                            "type": "placeholder",
                            "content": {
                                "id": "b02b893da3e3040aa87315c0ee11458ea",
                                "x": 179.109375,
                                "y": 3,
                                "words": [
                                    {
                                        "token": "",
                                        "categories": [
                                            {
                                                "head": {
                                                    "type": {
                                                        "type": "nominal",
                                                        "isDet": true,
                                                        "isTo": false,
                                                        "isGerund": false
                                                    },
                                                    "agr": {
                                                        "type": "3sing"
                                                    },
                                                    "determinered": true
                                                },
                                                "right": [
                                                    {
                                                        "head": {
                                                            "type": {
                                                                "type": "nominal",
                                                                "isDet": false,
                                                                "isTo": false,
                                                                "isGerund": false,
                                                                "isPron": false,
                                                                "isProper": false
                                                            },
                                                            "agr": {
                                                                "type": "3sing"
                                                            },
                                                            "count": true
                                                        }
                                                    }
                                                ],
                                                "translationTemplates": {
                                                    "default": [
                                                        "",
                                                        {
                                                            "path": [
                                                                "right",
                                                                0
                                                            ],
                                                            "key": "default"
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                ],
                                "color": "dodgerblue",
                                "isRound": true,
                                "children": [
                                    {
                                        "id": "head",
                                        "hidden": false,
                                        "type": "text",
                                        "content": "a/an",
                                        "resolved": false
                                    },
                                    {
                                        "id": "complement",
                                        "hidden": false,
                                        "type": "placeholder",
                                        "content": {
                                            "id": "be24fd733433944fca2681889653d388a",
                                            "x": 1094,
                                            "y": 730,
                                            "color": "dodgerblue",
                                            "isRound": true,
                                            "words": [
                                                {
                                                    "token": "pen",
                                                    "categories": [
                                                        {
                                                            "head": {
                                                                "type": {
                                                                    "type": "nominal",
                                                                    "isDet": false,
                                                                    "isTo": false,
                                                                    "isGerund": false,
                                                                    "isPron": false,
                                                                    "isProper": false
                                                                },
                                                                "agr": {
                                                                    "type": "3sing"
                                                                }
                                                            },
                                                            "translationTemplates": {
                                                                "default": [
                                                                    "ペン"
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    "token": "pens",
                                                    "categories": [
                                                        {
                                                            "head": {
                                                                "type": {
                                                                    "type": "nominal",
                                                                    "isDet": true,
                                                                    "isTo": false,
                                                                    "isGerund": false
                                                                },
                                                                "agr": {
                                                                    "type": "non-3sing",
                                                                    "num": "pl",
                                                                    "per": 3
                                                                }
                                                            },
                                                            "translationTemplates": {
                                                                "default": [
                                                                    "ペン"
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            "head": {
                                                                "type": {
                                                                    "type": "nominal",
                                                                    "isDet": false,
                                                                    "isTo": false,
                                                                    "isGerund": false,
                                                                    "isPron": false,
                                                                    "isProper": false
                                                                },
                                                                "agr": {
                                                                    "type": "non-3sing",
                                                                    "num": "pl",
                                                                    "per": 3
                                                                }
                                                            },
                                                            "translationTemplates": {
                                                                "default": [
                                                                    "ペン"
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            "children": [
                                                {
                                                    "id": "head",
                                                    "type": "dropdown",
                                                    "content": [
                                                        "pen",
                                                        "pens"
                                                    ],
                                                    "selected": 0,
                                                    "hidden": false,
                                                    "resolved": false
                                                }
                                            ],
                                            "translation": "ペン"
                                        },
                                        "resolved": false,
                                        "instanceId": "inst_c3cd6ee53186453cac054509bc231a2e"
                                    }
                                ],
                                "translation": "＿"
                            },
                            "hidden": false,
                            "headIndex": [
                                0,
                                1,
                                2,
                                3,
                                4
                            ],
                            "resolved": false,
                            "instanceId": "inst_94878d2d062e437fbfa45c95d10b4a3c"
                        }
                    ],
                    "isRound": true,
                    "translation": "＿を持っている"
                },
                "hidden": false,
                "resolved": false,
                "instanceId": "inst_d5fd103d47ac40e194e55c523d8deb65"
            },
            {
                "id": "punctuation",
                "type": "text",
                "content": ".",
                "hidden": false
            }
        ],
        "isRound": false,
        "translation": "私は＿を持っている"
        }
        ```

2.  **主語を変えてみよう**
    *   「あなたは犬が好きです。」
        ```sentence
        {
        "id": "",
        "x": 0,
        "y": 0,
        "color": "orange",
        "words": [
            {
                "token": "",
                "categories": [
                    {
                        "head": {
                            "type": "sentence",
                            "finite": true,
                            "inverted": false,
                            "negative": false
                        },
                        "left": [
                            {
                                "head": {
                                    "type": {
                                        "type": "nominal",
                                        "isDet": true
                                    },
                                    "case": "nom"
                                }
                            }
                        ],
                        "right": [
                            {
                                "head": {
                                    "type": "verb",
                                    "finite": true
                                },
                                "gaps": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal"
                                            },
                                            "case": "nom"
                                        }
                                    }
                                ]
                            }
                        ],
                        "customUnification": [
                            [
                                [
                                    "left",
                                    0,
                                    "head"
                                ],
                                [
                                    "right",
                                    0,
                                    "gaps",
                                    0,
                                    "head"
                                ]
                            ]
                        ],
                        "translationTemplates": {
                            "default": [
                                {
                                    "path": [
                                        "left",
                                        0
                                    ],
                                    "key": "default",
                                    "particle": "は"
                                },
                                {
                                    "path": [
                                        "right",
                                        0
                                    ],
                                    "key": "default"
                                }
                            ],
                            "nominal": [
                                {
                                    "path": [
                                        "left",
                                        0
                                    ],
                                    "key": "default",
                                    "particle": "が"
                                },
                                {
                                    "path": [
                                        "right",
                                        0
                                    ],
                                    "key": "default"
                                }
                            ]
                        }
                    }
                ]
            }
        ],
        "children": [
            {
                "id": "specifier",
                "type": "placeholder",
                "content": {
                    "id": "b06336dabbfc64b33bc84cbf58fc24c2b",
                    "x": 12,
                    "y": 6,
                    "color": "dodgerblue",
                    "isRound": true,
                    "words": [
                        {
                            "token": "you",
                            "categories": [
                                {
                                    "head": {
                                        "type": {
                                            "type": "nominal",
                                            "isDet": true,
                                            "isTo": false,
                                            "isGerund": false,
                                            "isPron": true,
                                            "isProper": false
                                        },
                                        "case": "nom",
                                        "agr": {
                                            "type": "non-3sing",
                                            "per": 2,
                                            "num": "sing"
                                        }
                                    },
                                    "translationTemplates": {
                                        "default": [
                                            "あなた"
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "token": "your",
                            "categories": [
                                {
                                    "head": {
                                        "type": {
                                            "type": "nominal",
                                            "isDet": true,
                                            "isTo": false,
                                            "isGerund": false
                                        },
                                        "agr": {
                                            "per": 3
                                        },
                                        "determinered": true
                                    },
                                    "right": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": false,
                                                    "isTo": false,
                                                    "isGerund": false,
                                                    "isPron": false,
                                                    "isProper": false
                                                },
                                                "agr": {}
                                            }
                                        }
                                    ],
                                    "customUnification": [
                                        [
                                            [
                                                "head",
                                                "agr"
                                            ],
                                            [
                                                "right",
                                                0,
                                                "head",
                                                "agr"
                                            ]
                                        ]
                                    ],
                                    "translationTemplates": {
                                        "default": [
                                            "あなたの",
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "head": {
                                        "type": {
                                            "type": "nominal",
                                            "isDet": true,
                                            "isTo": false,
                                            "isGerund": false
                                        },
                                        "agr": {
                                            "type": "3sing"
                                        },
                                        "determinered": true
                                    },
                                    "right": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true,
                                                    "isTo": false,
                                                    "isGerund": false
                                                }
                                            },
                                            "gaps": [
                                                {
                                                    "head": {
                                                        "type": {
                                                            "type": "nominal",
                                                            "isDet": true,
                                                            "isTo": false,
                                                            "isGerund": false
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ],
                                    "translationTemplates": {
                                        "default": [
                                            "あなたが",
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default"
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "token": "you",
                            "categories": [
                                {
                                    "head": {
                                        "type": {
                                            "type": "nominal",
                                            "isDet": true,
                                            "isTo": false,
                                            "isGerund": false,
                                            "isPron": true,
                                            "isProper": false
                                        },
                                        "case": "acc",
                                        "agr": {
                                            "type": "non-3sing",
                                            "per": 2,
                                            "num": "sing"
                                        }
                                    },
                                    "translationTemplates": {
                                        "default": [
                                            "あなた"
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "token": "yours",
                            "categories": [
                                {
                                    "head": {
                                        "type": {
                                            "type": "nominal",
                                            "isDet": true,
                                            "isTo": false,
                                            "isGerund": false,
                                            "isPron": true,
                                            "isProper": false
                                        },
                                        "agr": {
                                            "per": 3,
                                            "num": "sing"
                                        }
                                    },
                                    "translationTemplates": {
                                        "default": [
                                            "あなたのもの"
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "token": "yourself",
                            "categories": [
                                {
                                    "head": {
                                        "type": {
                                            "type": "nominal",
                                            "isDet": true,
                                            "isTo": false,
                                            "isGerund": false,
                                            "isPron": true,
                                            "isProper": false
                                        },
                                        "refl": true,
                                        "agr": {
                                            "type": "non-3sing",
                                            "per": 2,
                                            "num": "sing"
                                        }
                                    },
                                    "translationTemplates": {
                                        "default": [
                                            "あなた自身"
                                        ]
                                    }
                                }
                            ]
                        }
                    ],
                    "children": [
                        {
                            "id": "head",
                            "type": "dropdown",
                            "content": [
                                "You",
                                "Your",
                                "You",
                                "Yours",
                                "Yourself"
                            ],
                            "selected": 0,
                            "hidden": false,
                            "resolved": false
                        },
                        {
                            "id": "complement",
                            "type": "placeholder",
                            "content": null,
                            "hidden": true,
                            "headIndex": [
                                1
                            ],
                            "resolved": false,
                            "instanceId": "inst_d8593edfe3cc48f190a22283e2764e3e"
                        }
                    ],
                    "translation": "あなた"
                },
                "hidden": false,
                "resolved": false,
                "instanceId": "inst_54fa24773402498f8b8d5910739f69ae"
            },
            {
                "id": "head",
                "type": "text",
                "content": "",
                "hidden": false,
                "resolved": false
            },
            {
                "id": "complement",
                "type": "placeholder",
                "content": {
                    "id": "bc3af54cbf50247f4b4ac1ae2a6275444",
                    "x": 205.9140625,
                    "y": 3,
                    "words": [
                        {
                            "token": "like(base)",
                            "categories": [
                                {
                                    "head": {
                                        "type": "verb",
                                        "tense": "present",
                                        "finite": true,
                                        "form": "base",
                                        "adv_manner_type": "degree"
                                    },
                                    "left": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true,
                                                    "isTo": false,
                                                    "isGerund": false
                                                },
                                                "agr": {
                                                    "type": "non-3sing"
                                                },
                                                "case": "nom",
                                                "isSubject": true
                                            }
                                        }
                                    ],
                                    "right": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal"
                                                },
                                                "case": "acc"
                                            }
                                        }
                                    ],
                                    "translationTemplates": {
                                        "default": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "が"
                                            },
                                            "好きである"
                                        ],
                                        "imperfective": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "が"
                                            },
                                            "好きで"
                                        ],
                                        "past": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "が"
                                            },
                                            "好きだった"
                                        ]
                                    }
                                },
                                {
                                    "head": {
                                        "type": "verb",
                                        "finite": false,
                                        "form": "base",
                                        "adv_manner_type": "degree"
                                    },
                                    "left": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true
                                                }
                                            }
                                        }
                                    ],
                                    "right": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal"
                                                },
                                                "case": "acc"
                                            }
                                        }
                                    ],
                                    "translationTemplates": {
                                        "default": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "が"
                                            },
                                            "好きである"
                                        ],
                                        "imperfective": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "が"
                                            },
                                            "好きで"
                                        ],
                                        "past": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "が"
                                            },
                                            "好きだった"
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "token": "likes(es)",
                            "categories": [
                                {
                                    "head": {
                                        "type": "verb",
                                        "tense": "present",
                                        "finite": true,
                                        "form": "es",
                                        "adv_manner_type": "degree"
                                    },
                                    "left": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true
                                                },
                                                "agr": {
                                                    "type": "3sing"
                                                },
                                                "case": "nom"
                                            }
                                        }
                                    ],
                                    "right": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal"
                                                },
                                                "case": "acc"
                                            }
                                        }
                                    ],
                                    "translationTemplates": {
                                        "default": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "が"
                                            },
                                            "好きである"
                                        ],
                                        "imperfective": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "が"
                                            },
                                            "好きで"
                                        ],
                                        "past": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "が"
                                            },
                                            "好きだった"
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "token": "liked(ed)",
                            "categories": [
                                {
                                    "head": {
                                        "type": "verb",
                                        "tense": "past",
                                        "finite": true,
                                        "form": "ed",
                                        "adv_manner_type": "degree"
                                    },
                                    "left": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true
                                                },
                                                "case": "nom"
                                            }
                                        }
                                    ],
                                    "right": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal"
                                                },
                                                "case": "acc"
                                            }
                                        }
                                    ],
                                    "translationTemplates": {
                                        "default": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "が"
                                            },
                                            "好きだった"
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "token": "liked(perfect)",
                            "categories": [
                                {
                                    "head": {
                                        "type": "verb",
                                        "finite": false,
                                        "form": "perfect",
                                        "adv_manner_type": "degree"
                                    },
                                    "left": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true
                                                },
                                                "isSubject": true
                                            }
                                        }
                                    ],
                                    "right": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal"
                                                },
                                                "case": "acc"
                                            }
                                        }
                                    ],
                                    "translationTemplates": {
                                        "default": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "が"
                                            },
                                            "好きでいた"
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "token": "liking(ing)",
                            "categories": [
                                {
                                    "head": {
                                        "type": "verb",
                                        "finite": false,
                                        "form": "progressive",
                                        "adv_manner_type": "degree"
                                    },
                                    "left": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true
                                                },
                                                "isSubject": true
                                            }
                                        }
                                    ],
                                    "right": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal"
                                                },
                                                "case": "acc"
                                            }
                                        }
                                    ],
                                    "translationTemplates": {
                                        "default": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "が"
                                            },
                                            "好きになっているところ"
                                        ],
                                        "nonPredicate": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "が"
                                            },
                                            "好きになっている"
                                        ]
                                    }
                                },
                                {
                                    "head": {
                                        "type": {
                                            "type": "nominal",
                                            "isGerund": true,
                                            "isSubject": true
                                        },
                                        "agr": {
                                            "type": "3sing"
                                        },
                                        "adv_manner_type": "degree"
                                    },
                                    "left": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true
                                                }
                                            }
                                        }
                                    ],
                                    "right": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal"
                                                },
                                                "case": "acc"
                                            }
                                        }
                                    ],
                                    "translationTemplates": {
                                        "default": [
                                            {
                                                "path": [
                                                    "right",
                                                    0
                                                ],
                                                "key": "default",
                                                "particle": "が"
                                            },
                                            "好きなこと"
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "token": "liked(passive)",
                            "categories": [
                                {
                                    "head": {
                                        "type": "verb",
                                        "finite": false,
                                        "form": "passive",
                                        "adv_manner_type": "degree"
                                    },
                                    "left": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true
                                                },
                                                "isSubject": true
                                            }
                                        }
                                    ],
                                    "right": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal"
                                                },
                                                "case": "acc"
                                            }
                                        }
                                    ],
                                    "translationTemplates": {
                                        "default": [
                                            "好まれ"
                                        ]
                                    }
                                }
                            ]
                        }
                    ],
                    "color": "tomato",
                    "children": [
                        {
                            "id": "head",
                            "type": "dropdown",
                            "content": [
                                "like",
                                "likes",
                                "liked",
                                "liked",
                                "liking",
                                "liked"
                            ],
                            "selected": 0,
                            "hidden": false,
                            "resolved": false
                        },
                        {
                            "id": "complement-0",
                            "type": "placeholder",
                            "content": {
                                "id": "bd9f6ebaf27fa4216b674d7f97a89001b",
                                "x": 954,
                                "y": 704,
                                "color": "dodgerblue",
                                "isRound": true,
                                "words": [
                                    {
                                        "token": "dog",
                                        "categories": [
                                            {
                                                "head": {
                                                    "type": {
                                                        "type": "nominal",
                                                        "isDet": false,
                                                        "isTo": false,
                                                        "isGerund": false,
                                                        "isPron": false,
                                                        "isProper": false
                                                    },
                                                    "agr": {
                                                        "type": "3sing"
                                                    }
                                                },
                                                "translationTemplates": {
                                                    "default": [
                                                        "犬"
                                                    ]
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        "token": "dogs",
                                        "categories": [
                                            {
                                                "head": {
                                                    "type": {
                                                        "type": "nominal",
                                                        "isDet": true,
                                                        "isTo": false,
                                                        "isGerund": false
                                                    },
                                                    "agr": {
                                                        "type": "non-3sing",
                                                        "num": "pl",
                                                        "per": 3
                                                    }
                                                },
                                                "translationTemplates": {
                                                    "default": [
                                                        "犬"
                                                    ]
                                                }
                                            },
                                            {
                                                "head": {
                                                    "type": {
                                                        "type": "nominal",
                                                        "isDet": false,
                                                        "isTo": false,
                                                        "isGerund": false,
                                                        "isPron": false,
                                                        "isProper": false
                                                    },
                                                    "agr": {
                                                        "type": "non-3sing",
                                                        "num": "pl",
                                                        "per": 3
                                                    }
                                                },
                                                "translationTemplates": {
                                                    "default": [
                                                        "犬"
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                ],
                                "children": [
                                    {
                                        "id": "head",
                                        "type": "dropdown",
                                        "content": [
                                            "dog",
                                            "dogs"
                                        ],
                                        "selected": 1,
                                        "hidden": false,
                                        "resolved": false
                                    }
                                ],
                                "translation": "犬"
                            },
                            "hidden": false,
                            "headIndex": [
                                0,
                                1,
                                2,
                                3,
                                4
                            ],
                            "resolved": false,
                            "instanceId": "inst_3fce271a8c2945619ce45afb7531ede5"
                        }
                    ],
                    "isRound": true,
                    "translation": "＿が好きである"
                },
                "hidden": false,
                "resolved": false,
                "instanceId": "inst_cc78967f8c6b4bb59408b759f2977771"
            },
            {
                "id": "punctuation",
                "type": "text",
                "content": ".",
                "hidden": false
            }
        ],
        "isRound": false,
        "translation": "あなたは＿が好きである"
            }
        ```
    *   「私たちは本を持っています。」
        ```sentence
                    {
                "id": "",
                "x": 0,
                "y": 0,
                "color": "orange",
                "words": [
                    {
                        "token": "",
                        "categories": [
                            {
                                "head": {
                                    "type": "sentence",
                                    "finite": true,
                                    "inverted": false,
                                    "negative": false
                                },
                                "left": [
                                    {
                                        "head": {
                                            "type": {
                                                "type": "nominal",
                                                "isDet": true
                                            },
                                            "case": "nom"
                                        }
                                    }
                                ],
                                "right": [
                                    {
                                        "head": {
                                            "type": "verb",
                                            "finite": true
                                        },
                                        "gaps": [
                                            {
                                                "head": {
                                                    "type": {
                                                        "type": "nominal"
                                                    },
                                                    "case": "nom"
                                                }
                                            }
                                        ]
                                    }
                                ],
                                "customUnification": [
                                    [
                                        [
                                            "left",
                                            0,
                                            "head"
                                        ],
                                        [
                                            "right",
                                            0,
                                            "gaps",
                                            0,
                                            "head"
                                        ]
                                    ]
                                ],
                                "translationTemplates": {
                                    "default": [
                                        {
                                            "path": [
                                                "left",
                                                0
                                            ],
                                            "key": "default",
                                            "particle": "は"
                                        },
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default"
                                        }
                                    ],
                                    "nominal": [
                                        {
                                            "path": [
                                                "left",
                                                0
                                            ],
                                            "key": "default",
                                            "particle": "が"
                                        },
                                        {
                                            "path": [
                                                "right",
                                                0
                                            ],
                                            "key": "default"
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                ],
                "children": [
                    {
                        "id": "specifier",
                        "type": "placeholder",
                        "content": {
                            "id": "b27739385da3148b2a6b02e4d69142886",
                            "x": 12,
                            "y": 6,
                            "color": "dodgerblue",
                            "isRound": true,
                            "words": [
                                {
                                    "token": "we",
                                    "categories": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true,
                                                    "isTo": false,
                                                    "isGerund": false,
                                                    "isPron": true,
                                                    "isProper": false
                                                },
                                                "case": "nom",
                                                "agr": {
                                                    "type": "non-3sing",
                                                    "per": 1,
                                                    "num": "pl"
                                                }
                                            },
                                            "translationTemplates": {
                                                "default": [
                                                    "私たち"
                                                ]
                                            }
                                        }
                                    ]
                                },
                                {
                                    "token": "our",
                                    "categories": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true,
                                                    "isTo": false,
                                                    "isGerund": false
                                                },
                                                "agr": {
                                                    "per": 3
                                                },
                                                "determinered": true
                                            },
                                            "right": [
                                                {
                                                    "head": {
                                                        "type": {
                                                            "type": "nominal",
                                                            "isDet": false,
                                                            "isTo": false,
                                                            "isGerund": false,
                                                            "isPron": false,
                                                            "isProper": false
                                                        },
                                                        "agr": {}
                                                    }
                                                }
                                            ],
                                            "customUnification": [
                                                [
                                                    [
                                                        "head",
                                                        "agr"
                                                    ],
                                                    [
                                                        "right",
                                                        0,
                                                        "head",
                                                        "agr"
                                                    ]
                                                ]
                                            ],
                                            "translationTemplates": {
                                                "default": [
                                                    "私たちの",
                                                    {
                                                        "path": [
                                                            "right",
                                                            0
                                                        ],
                                                        "key": "default"
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true,
                                                    "isTo": false,
                                                    "isGerund": false
                                                },
                                                "agr": {
                                                    "type": "3sing"
                                                },
                                                "determinered": true
                                            },
                                            "right": [
                                                {
                                                    "head": {
                                                        "type": {
                                                            "type": "nominal",
                                                            "isDet": true,
                                                            "isTo": false,
                                                            "isGerund": false
                                                        }
                                                    },
                                                    "gaps": [
                                                        {
                                                            "head": {
                                                                "type": {
                                                                    "type": "nominal",
                                                                    "isDet": true,
                                                                    "isTo": false,
                                                                    "isGerund": false
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            "translationTemplates": {
                                                "default": [
                                                    "私たちが",
                                                    {
                                                        "path": [
                                                            "right",
                                                            0
                                                        ],
                                                        "key": "default"
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                },
                                {
                                    "token": "us",
                                    "categories": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true,
                                                    "isTo": false,
                                                    "isGerund": false,
                                                    "isPron": true,
                                                    "isProper": false
                                                },
                                                "case": "acc",
                                                "agr": {
                                                    "type": "non-3sing",
                                                    "per": 1,
                                                    "num": "pl"
                                                }
                                            },
                                            "translationTemplates": {
                                                "default": [
                                                    "私たち"
                                                ]
                                            }
                                        }
                                    ]
                                },
                                {
                                    "token": "ours",
                                    "categories": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true,
                                                    "isTo": false,
                                                    "isGerund": false,
                                                    "isPron": true,
                                                    "isProper": false
                                                },
                                                "agr": {
                                                    "per": 3,
                                                    "num": "pl"
                                                }
                                            },
                                            "translationTemplates": {
                                                "default": [
                                                    "私たちのもの"
                                                ]
                                            }
                                        }
                                    ]
                                },
                                {
                                    "token": "ourselves",
                                    "categories": [
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isDet": true,
                                                    "isTo": false,
                                                    "isGerund": false,
                                                    "isPron": true,
                                                    "isProper": false
                                                },
                                                "refl": true,
                                                "agr": {
                                                    "type": "non-3sing",
                                                    "per": 1,
                                                    "num": "pl"
                                                }
                                            },
                                            "translationTemplates": {
                                                "default": [
                                                    "私たち自身"
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ],
                            "children": [
                                {
                                    "id": "head",
                                    "type": "dropdown",
                                    "content": [
                                        "We",
                                        "Our",
                                        "Us",
                                        "Ours",
                                        "Ourselves"
                                    ],
                                    "selected": 0,
                                    "hidden": false,
                                    "resolved": false
                                },
                                {
                                    "id": "complement",
                                    "type": "placeholder",
                                    "content": null,
                                    "hidden": true,
                                    "headIndex": [
                                        1
                                    ],
                                    "resolved": false,
                                    "instanceId": "inst_388994b9e8e74ccf97ad2ee5e24938d5"
                                }
                            ],
                            "translation": "私たち"
                        },
                        "hidden": false,
                        "resolved": false,
                        "instanceId": "inst_54fa24773402498f8b8d5910739f69ae"
                    },
                    {
                        "id": "head",
                        "type": "text",
                        "content": "",
                        "hidden": false,
                        "resolved": false
                    },
                    {
                        "id": "complement",
                        "type": "placeholder",
                        "content": {
                            "id": "b1756586c21324269be47b452f9d6867d",
                            "x": 195.109375,
                            "y": 3,
                            "words": [
                                {
                                    "token": "have(base)",
                                    "categories": [
                                        {
                                            "head": {
                                                "type": "verb",
                                                "tense": "present",
                                                "finite": true,
                                                "form": "base",
                                                "adv_manner_type": "none"
                                            },
                                            "left": [
                                                {
                                                    "head": {
                                                        "type": {
                                                            "type": "nominal",
                                                            "isDet": true,
                                                            "isTo": false,
                                                            "isGerund": false
                                                        },
                                                        "agr": {
                                                            "type": "non-3sing"
                                                        },
                                                        "case": "nom",
                                                        "isSubject": true
                                                    }
                                                }
                                            ],
                                            "right": [
                                                {
                                                    "head": {
                                                        "type": {
                                                            "type": "nominal",
                                                            "isDet": true,
                                                            "isTo": false,
                                                            "isGerund": false
                                                        },
                                                        "case": "acc"
                                                    }
                                                }
                                            ],
                                            "translationTemplates": {
                                                "default": [
                                                    {
                                                        "path": [
                                                            "right",
                                                            0
                                                        ],
                                                        "key": "default",
                                                        "particle": "を"
                                                    },
                                                    "持っている"
                                                ],
                                                "imperfective": [
                                                    {
                                                        "path": [
                                                            "right",
                                                            0
                                                        ],
                                                        "key": "default",
                                                        "particle": "を"
                                                    },
                                                    "持ってい"
                                                ],
                                                "past": [
                                                    {
                                                        "path": [
                                                            "right",
                                                            0
                                                        ],
                                                        "key": "default",
                                                        "particle": "を"
                                                    },
                                                    "持っていた"
                                                ]
                                            }
                                        },
                                        {
                                            "head": {
                                                "type": "verb",
                                                "finite": false,
                                                "form": "base",
                                                "adv_manner_type": "none"
                                            },
                                            "left": [
                                                {
                                                    "head": {
                                                        "type": {
                                                            "type": "nominal",
                                                            "isDet": true,
                                                            "isGerund": false,
                                                            "isTo": false
                                                        }
                                                    }
                                                }
                                            ],
                                            "right": [
                                                {
                                                    "head": {
                                                        "type": {
                                                            "type": "nominal",
                                                            "isDet": true,
                                                            "isTo": false,
                                                            "isGerund": false
                                                        },
                                                        "case": "acc"
                                                    }
                                                }
                                            ],
                                            "translationTemplates": {
                                                "default": [
                                                    {
                                                        "path": [
                                                            "right",
                                                            0
                                                        ],
                                                        "key": "default",
                                                        "particle": "を"
                                                    },
                                                    "持っている"
                                                ],
                                                "imperfective": [
                                                    {
                                                        "path": [
                                                            "right",
                                                            0
                                                        ],
                                                        "key": "default",
                                                        "particle": "を"
                                                    },
                                                    "持ってい"
                                                ],
                                                "past": [
                                                    {
                                                        "path": [
                                                            "right",
                                                            0
                                                        ],
                                                        "key": "default",
                                                        "particle": "を"
                                                    },
                                                    "持っていた"
                                                ]
                                            }
                                        }
                                    ]
                                },
                                {
                                    "token": "has(es)",
                                    "categories": [
                                        {
                                            "head": {
                                                "type": "verb",
                                                "tense": "present",
                                                "finite": true,
                                                "form": "es",
                                                "adv_manner_type": "none"
                                            },
                                            "left": [
                                                {
                                                    "head": {
                                                        "type": {
                                                            "type": "nominal",
                                                            "isDet": true,
                                                            "isGerund": false,
                                                            "isTo": false
                                                        },
                                                        "agr": {
                                                            "type": "3sing"
                                                        },
                                                        "case": "nom"
                                                    }
                                                }
                                            ],
                                            "right": [
                                                {
                                                    "head": {
                                                        "type": {
                                                            "type": "nominal",
                                                            "isDet": true,
                                                            "isTo": false,
                                                            "isGerund": false
                                                        },
                                                        "case": "acc"
                                                    }
                                                }
                                            ],
                                            "translationTemplates": {
                                                "default": [
                                                    {
                                                        "path": [
                                                            "right",
                                                            0
                                                        ],
                                                        "key": "default",
                                                        "particle": "を"
                                                    },
                                                    "持っている"
                                                ],
                                                "imperfective": [
                                                    {
                                                        "path": [
                                                            "right",
                                                            0
                                                        ],
                                                        "key": "default",
                                                        "particle": "を"
                                                    },
                                                    "持ってい"
                                                ],
                                                "past": [
                                                    {
                                                        "path": [
                                                            "right",
                                                            0
                                                        ],
                                                        "key": "default",
                                                        "particle": "を"
                                                    },
                                                    "持っていた"
                                                ]
                                            }
                                        }
                                    ]
                                },
                                {
                                    "token": "had(ed)",
                                    "categories": [
                                        {
                                            "head": {
                                                "type": "verb",
                                                "tense": "past",
                                                "finite": true,
                                                "form": "ed",
                                                "adv_manner_type": "none"
                                            },
                                            "left": [
                                                {
                                                    "head": {
                                                        "type": {
                                                            "type": "nominal",
                                                            "isDet": true,
                                                            "isGerund": false,
                                                            "isTo": false
                                                        },
                                                        "case": "nom"
                                                    }
                                                }
                                            ],
                                            "right": [
                                                {
                                                    "head": {
                                                        "type": {
                                                            "type": "nominal",
                                                            "isDet": true,
                                                            "isTo": false,
                                                            "isGerund": false
                                                        },
                                                        "case": "acc"
                                                    }
                                                }
                                            ],
                                            "translationTemplates": {
                                                "default": [
                                                    {
                                                        "path": [
                                                            "right",
                                                            0
                                                        ],
                                                        "key": "default",
                                                        "particle": "を"
                                                    },
                                                    "持っていた"
                                                ]
                                            }
                                        }
                                    ]
                                },
                                {
                                    "token": "had(perfect)",
                                    "categories": [
                                        {
                                            "head": {
                                                "type": "verb",
                                                "finite": false,
                                                "form": "perfect",
                                                "adv_manner_type": "none"
                                            },
                                            "left": [
                                                {
                                                    "head": {
                                                        "type": {
                                                            "type": "nominal",
                                                            "isDet": true,
                                                            "isGerund": false,
                                                            "isTo": false
                                                        },
                                                        "isSubject": true
                                                    }
                                                }
                                            ],
                                            "right": [
                                                {
                                                    "head": {
                                                        "type": {
                                                            "type": "nominal",
                                                            "isDet": true,
                                                            "isTo": false,
                                                            "isGerund": false
                                                        },
                                                        "case": "acc"
                                                    }
                                                }
                                            ],
                                            "translationTemplates": {
                                                "default": [
                                                    {
                                                        "path": [
                                                            "right",
                                                            0
                                                        ],
                                                        "key": "default",
                                                        "particle": "を"
                                                    },
                                                    "既に持ってい"
                                                ]
                                            }
                                        }
                                    ]
                                },
                                {
                                    "token": "having(ing)",
                                    "categories": [
                                        {
                                            "head": {
                                                "type": "verb",
                                                "finite": false,
                                                "form": "progressive",
                                                "adv_manner_type": "none"
                                            },
                                            "left": [
                                                {
                                                    "head": {
                                                        "type": {
                                                            "type": "nominal",
                                                            "isDet": true,
                                                            "isGerund": false,
                                                            "isTo": false
                                                        },
                                                        "isSubject": true
                                                    }
                                                }
                                            ],
                                            "right": [
                                                {
                                                    "head": {
                                                        "type": {
                                                            "type": "nominal",
                                                            "isDet": true,
                                                            "isTo": false,
                                                            "isGerund": false
                                                        },
                                                        "case": "acc"
                                                    }
                                                }
                                            ],
                                            "translationTemplates": {
                                                "default": [
                                                    {
                                                        "path": [
                                                            "right",
                                                            0
                                                        ],
                                                        "key": "default",
                                                        "particle": "を"
                                                    },
                                                    "持っているところ"
                                                ],
                                                "nonPredicate": [
                                                    {
                                                        "path": [
                                                            "right",
                                                            0
                                                        ],
                                                        "key": "default",
                                                        "particle": "を"
                                                    },
                                                    "持っている"
                                                ]
                                            }
                                        },
                                        {
                                            "head": {
                                                "type": {
                                                    "type": "nominal",
                                                    "isGerund": true,
                                                    "isSubject": true
                                                },
                                                "agr": {
                                                    "type": "3sing"
                                                },
                                                "adv_manner_type": "none"
                                            },
                                            "left": [
                                                {
                                                    "head": {
                                                        "type": {
                                                            "type": "nominal",
                                                            "isDet": true,
                                                            "isGerund": false,
                                                            "isTo": false
                                                        }
                                                    }
                                                }
                                            ],
                                            "right": [
                                                {
                                                    "head": {
                                                        "type": {
                                                            "type": "nominal",
                                                            "isDet": true,
                                                            "isTo": false,
                                                            "isGerund": false
                                                        },
                                                        "case": "acc"
                                                    }
                                                }
                                            ],
                                            "translationTemplates": {
                                                "default": [
                                                    {
                                                        "path": [
                                                            "right",
                                                            0
                                                        ],
                                                        "key": "default",
                                                        "particle": "を"
                                                    },
                                                    "持っていること"
                                                ],
                                                "no": [
                                                    {
                                                        "path": [
                                                            "right",
                                                            0
                                                        ],
                                                        "key": "default",
                                                        "particle": "を"
                                                    },
                                                    "持っているの"
                                                ],
                                                "past": [
                                                    {
                                                        "path": [
                                                            "right",
                                                            0
                                                        ],
                                                        "key": "default",
                                                        "particle": "を"
                                                    },
                                                    "持っていたこと"
                                                ],
                                                "pastNo": [
                                                    {
                                                        "path": [
                                                            "right",
                                                            0
                                                        ],
                                                        "key": "default",
                                                        "particle": "を"
                                                    },
                                                    "持っていたの"
                                                ]
                                            }
                                        }
                                    ]
                                },
                                {
                                    "token": "had(passive)",
                                    "categories": [
                                        {
                                            "head": {
                                                "type": "verb",
                                                "finite": false,
                                                "form": "passive",
                                                "adv_manner_type": "none"
                                            },
                                            "left": [
                                                {
                                                    "head": {
                                                        "type": {
                                                            "type": "nominal",
                                                            "isDet": true,
                                                            "isGerund": false,
                                                            "isTo": false
                                                        },
                                                        "isSubject": true
                                                    }
                                                }
                                            ],
                                            "right": [
                                                {
                                                    "head": {
                                                        "type": {
                                                            "type": "nominal",
                                                            "isDet": true,
                                                            "isTo": false,
                                                            "isGerund": false
                                                        },
                                                        "case": "acc"
                                                    }
                                                }
                                            ],
                                            "translationTemplates": {
                                                "default": [
                                                    "所有されてい"
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ],
                            "color": "tomato",
                            "children": [
                                {
                                    "id": "head",
                                    "type": "dropdown",
                                    "content": [
                                        "have",
                                        "has",
                                        "had",
                                        "had",
                                        "having",
                                        "had"
                                    ],
                                    "selected": 0,
                                    "hidden": false,
                                    "resolved": false
                                },
                                {
                                    "id": "complement-0",
                                    "type": "placeholder",
                                    "content": {
                                        "id": "bef47ecaacb8e48adae1180e9064c9b01",
                                        "x": 1094,
                                        "y": 738,
                                        "color": "dodgerblue",
                                        "isRound": true,
                                        "words": [
                                            {
                                                "token": "book",
                                                "categories": [
                                                    {
                                                        "head": {
                                                            "type": {
                                                                "type": "nominal",
                                                                "isDet": false,
                                                                "isTo": false,
                                                                "isGerund": false,
                                                                "isPron": false,
                                                                "isProper": false
                                                            },
                                                            "agr": {
                                                                "type": "3sing"
                                                            }
                                                        },
                                                        "translationTemplates": {
                                                            "default": [
                                                                "本"
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "token": "books",
                                                "categories": [
                                                    {
                                                        "head": {
                                                            "type": {
                                                                "type": "nominal",
                                                                "isDet": true,
                                                                "isTo": false,
                                                                "isGerund": false
                                                            },
                                                            "agr": {
                                                                "type": "non-3sing",
                                                                "num": "pl",
                                                                "per": 3
                                                            }
                                                        },
                                                        "translationTemplates": {
                                                            "default": [
                                                                "本"
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        "head": {
                                                            "type": {
                                                                "type": "nominal",
                                                                "isDet": false,
                                                                "isTo": false,
                                                                "isGerund": false,
                                                                "isPron": false,
                                                                "isProper": false
                                                            },
                                                            "agr": {
                                                                "type": "non-3sing",
                                                                "num": "pl",
                                                                "per": 3
                                                            }
                                                        },
                                                        "translationTemplates": {
                                                            "default": [
                                                                "本"
                                                            ]
                                                        }
                                                    }
                                                ]
                                            }
                                        ],
                                        "children": [
                                            {
                                                "id": "head",
                                                "type": "dropdown",
                                                "content": [
                                                    "book",
                                                    "books"
                                                ],
                                                "selected": 1,
                                                "hidden": false,
                                                "resolved": false
                                            }
                                        ],
                                        "translation": "本"
                                    },
                                    "hidden": false,
                                    "headIndex": [
                                        0,
                                        1,
                                        2,
                                        3,
                                        4
                                    ],
                                    "resolved": false,
                                    "instanceId": "inst_e58ad1bfba8842f6b71e2125e3943d5c"
                                }
                            ],
                            "isRound": true,
                            "translation": "＿を持っている"
                        },
                        "hidden": false,
                        "resolved": false,
                        "instanceId": "inst_cc78967f8c6b4bb59408b759f2977771"
                    },
                    {
                        "id": "punctuation",
                        "type": "text",
                        "content": ".",
                        "hidden": false
                    }
                ],
                "isRound": false,
                "translation": "私たちは＿を持っている"
            }
        ```

3.  **自分で作ってみよう**
    *   あなたが好きな動物やものを「私は〜が好きです」という形で言ってみましょう。
    *   あなたが持っているものを「私は〜を持っています」という形で言ってみましょう。