---
title: 'Sentence Builderへようこそ！'
order: 1
---

# Sentence Builderへようこそ！

このアプリは、英語の文章がどのように作られるかを、ブロックを組み立てながら直感的に学べるようにデザインされています。

従来の参考書のように、難しい文法用語をたくさん覚える必要はありません。実際に手を動かしながら、英語の「語順」や「単語のつながり」の感覚を身につけていきましょう。

## このアプリの基本的な使い方

画面の左側には、たくさんの「単語ブロック」がカテゴリー別に並んでいます。

1.  **ブロックを選ぶ**: 使いたい単語のブロックを左のリストから探します。
2.  **ドラッグ＆ドロップ**: ブロックを掴んで、真ん中の広いエリア（キャンバス）に移動させます。
3.  **ブロックをつなげる**: ブロック同士をくっつけて、文章を組み立てます。正しい場所にはめ込むと、ブロックが吸い付くようにくっつきます。

最初は簡単な文章から始めてみましょう。例えば、**私は猫が好きです**という文章を作ってみてください。

### ヒント：主語＋動詞＋目的語

英語の文章の多くは、「誰が」→「何をする」→「何を」という順番（語順）で作られます。これを文法の言葉で **S (Subject) + V (Verb) + O (Object)** と言います。

-   **S (主語)**: 文の主人公。「私」「あなた」「その犬」など。
-   **V (動詞)**: 主語の動きや状態。「好き」「走る」「食べる」など。
-   **O (目的語)**: 動詞の対象。「猫を」「テニスを」「リンゴを」など。

### 答え

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
                "id": "b502fd93e49f64561b70a29d39136f710",
                "x": 734.6577758789062,
                "y": 833.2013549804688,
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
                        "instanceId": "inst_ededd9b277724d13a47531595929759b"
                    }
                ],
                "translation": "私"
            },
            "hidden": false,
            "resolved": false,
            "instanceId": "inst_73b5122c26b540ba9cf1878c74fc2b59"
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
                "id": "bd97f161b74024a0c9ca2de985887996f",
                "x": 136,
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
                            "id": "bc7c4b44c4c5e4d0780979509c3a87dea",
                            "x": 151.6796875,
                            "y": 3,
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
                        "instanceId": "inst_bc1b4726b62b4956bedebbb3155e6478"
                    }
                ],
                "isRound": true,
                "translation": "猫が好きである"
            },
            "hidden": false,
            "resolved": false,
            "instanceId": "inst_d472713a27a84b278ba5ef8b9abd75a2"
        },
        {
            "id": "punctuation",
            "type": "text",
            "content": ".",
            "hidden": false
        }
    ],
    "isRound": false,
    "translation": "＿は猫が好きである"
}
```


---

## 学習の進め方

このアクティビティパネルでは、これから様々なレッスンを提供していく予定です。

### 1. テキスト教材（レッスン）

基本的な文法ルールや表現を、ステップバイステップで学べるモードです。

-   簡単な自己紹介の仕方
-   質問の作り方
-   過去や未来のことの言い方

それぞれのレッスンには、まず「例」が示され、その後に自分で文章を作る「練習問題」が用意されています。

### 2. 写真描写トレーニング

表示される写真を見て、そこに写っている状況を英語で説明するトレーニングです。

> 例えば、公園で男の子がボールを蹴っている写真が表示されたら、"A boy is kicking a ball." のような文章を作ります。

この練習を通じて、目に見えるものを英語で表現する力を養うことができます。

### 3. AI講師との英会話

AIの英語講師とチャット形式で会話するモードです。

AIからの質問に対して、あなたがブロックで文章を作って返信します。もし間違った文章を作ってしまっても、AIが優しく訂正してくれるので、安心して会話の練習ができます。

## 最後に

このアプリでの学習に「正解」は一つだけではありません。色々なブロックを自由に組み合わせて、どんな文章ができるか試してみてください。時には、思いがけない発見があるかもしれません。

それでは、Sentence Builderでの学習を楽しんでください！