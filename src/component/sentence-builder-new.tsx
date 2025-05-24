"use client"

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Renderer } from "@/renderer/renderer";
import { blockList } from "@/grammar/blocks/blocks";

const blocks = [
    {
        "id": "b17b0c641a9e040559be3a0370663daf2",
        "lexicons": [
            {
                "word": "I",
                "categories": [
                    {
                        "base": "DP",
                        "features": {
                            "φ": [
                                "1S"
                            ],
                            "case": [
                                "nom"
                            ]
                        },
                        "specifiers": [],
                        "complements": [],
                        "translation": {
                            "base": "私"
                        }
                    }
                ]
            },
            {
                "word": "my",
                "categories": [
                    {
                        "base": "DP",
                        "features": {
                            "φ": [
                                "3S"
                            ],
                            "case": [
                                "nom",
                                "acc"
                            ]
                        },
                        "specifiers": [],
                        "complements": [
                            {
                                "base": "NP",
                                "features": {
                                    "φ": [
                                        "3S"
                                    ]
                                },
                                "specifiers": [],
                                "complements": [],
                                "translation": {}
                            }
                        ],
                        "translation": {
                            "base": "私の{C1}"
                        }
                    },
                    {
                        "base": "DP",
                        "features": {
                            "φ": [
                                "3P"
                            ],
                            "case": [
                                "nom",
                                "acc"
                            ]
                        },
                        "specifiers": [],
                        "complements": [
                            {
                                "base": "NP",
                                "features": {
                                    "φ": [
                                        "3P"
                                    ]
                                },
                                "specifiers": [],
                                "complements": [],
                                "translation": {}
                            }
                        ],
                        "translation": {
                            "base": "私の{C1}"
                        }
                    }
                ]
            },
            {
                "word": "me",
                "categories": [
                    {
                        "base": "DP",
                        "features": {
                            "φ": [
                                "1S"
                            ],
                            "case": [
                                "acc"
                            ]
                        },
                        "specifiers": [],
                        "complements": [],
                        "translation": {
                            "base": "私"
                        }
                    }
                ]
            },
            {
                "word": "mine",
                "categories": [
                    {
                        "base": "DP",
                        "features": {
                            "φ": [
                                "3S"
                            ],
                            "case": [
                                "nom",
                                "acc"
                            ]
                        },
                        "specifiers": [],
                        "complements": [],
                        "translation": {
                            "base": "私のもの"
                        }
                    }
                ]
            },
            {
                "word": "myself",
                "categories": [
                    {
                        "base": "DP",
                        "features": {
                            "φ": [
                                "1S"
                            ],
                            "case": [
                                "acc"
                            ]
                        },
                        "specifiers": [],
                        "complements": [],
                        "translation": {
                            "base": "私自身"
                        }
                    }
                ]
            }
        ],
        "x": 360,
        "y": 120,
        "color": "dodgerblue",
        "isRound": true,
        "children": [
            {
                "id": "head",
                "hidden": false,
                "keepEmpty": false,
                "type": "dropdown",
                "content": [
                    "I",
                    "my",
                    "me",
                    "mine",
                    "myself"
                ],
                "selected": 0
            },
            {
                "id": "complement",
                "hidden": true,
                "keepEmpty": false,
                "type": "placeholder",
                "content": null,
                "headIndex": [
                    1
                ]
            }
        ],
        "translation": " 私 "
    },
    {
        "id": "b9950f62f08bf4a63931e5ea8cf315c00",
        "lexicons": [
            {
                "word": "",
                "categories": [
                    {
                        "base": "TP",
                        "features": {},
                        "specifiers": [
                            {
                                "base": "DP",
                                "features": {
                                    "φ": [
                                        "1S",
                                        "2S",
                                        "1P",
                                        "2P",
                                        "3P"
                                    ],
                                    "case": [
                                        "nom"
                                    ]
                                },
                                "specifiers": [],
                                "complements": [],
                                "translation": {}
                            }
                        ],
                        "complements": [
                            {
                                "base": "TB",
                                "features": {
                                    "form": [
                                        "base",
                                        "ed"
                                    ]
                                },
                                "specifiers": [],
                                "complements": [],
                                "translation": {}
                            }
                        ],
                        "translation": {
                            "wa": "{S1}は{C1}",
                            "ga": "{S1}が{C1}"
                        }
                    },
                    {
                        "base": "TP",
                        "features": {},
                        "specifiers": [
                            {
                                "base": "DP",
                                "features": {
                                    "φ": [
                                        "3S"
                                    ],
                                    "case": [
                                        "nom"
                                    ]
                                },
                                "specifiers": [],
                                "complements": [],
                                "translation": {}
                            }
                        ],
                        "complements": [
                            {
                                "base": "TB",
                                "features": {
                                    "form": [
                                        "es",
                                        "ed"
                                    ]
                                },
                                "specifiers": [],
                                "complements": [],
                                "translation": {}
                            }
                        ],
                        "translation": {
                            "wa": "{S1}は{C1}",
                            "ga": "{S1}が{C1}"
                        }
                    }
                ]
            }
        ],
        "x": 560,
        "y": 322,
        "color": "lightBlue",
        "children": [
            {
                "id": "specifier",
                "type": "placeholder",
                "content": null,
                "hidden": false,
                "keepEmpty": false
            },
            {
                "id": "head",
                "type": "text",
                "content": "",
                "hidden": false,
                "keepEmpty": false
            },
            {
                "id": "complement",
                "type": "placeholder",
                "content": null,
                "hidden": false,
                "keepEmpty": false
            }
        ],
        "translation": " ＿＿は＿＿ "
    },
    {
        "id": "b5ef959d0b21f4e39bc7db7fe2ced06fc",
        "lexicons": [
            {
                "word": "have",
                "categories": [
                    {
                        "base": "TB",
                        "features": {
                            "form": [
                                "base"
                            ]
                        },
                        "specifiers": [],
                        "complements": [
                            {
                                "base": "DP",
                                "features": {
                                    "case": [
                                        "acc"
                                    ]
                                },
                                "specifiers": [],
                                "complements": [],
                                "translation": {}
                            }
                        ],
                        "translation": {
                            "base": "{C1[を]}持っている",
                            "imperfect": "{C1[を]}持ってい"
                        }
                    },
                    {
                        "base": "VP",
                        "features": {
                            "form": [
                                "base"
                            ]
                        },
                        "specifiers": [],
                        "complements": [
                            {
                                "base": "DP",
                                "features": {
                                    "case": [
                                        "acc"
                                    ]
                                },
                                "specifiers": [],
                                "complements": [],
                                "translation": {}
                            }
                        ],
                        "translation": {
                            "base": "{C1[を]}持っている",
                            "imperfect": "{C1[を]}持ってい"
                        }
                    }
                ]
            },
            {
                "word": "has",
                "categories": [
                    {
                        "base": "TB",
                        "features": {
                            "form": [
                                "es"
                            ]
                        },
                        "specifiers": [],
                        "complements": [
                            {
                                "base": "DP",
                                "features": {
                                    "case": [
                                        "acc"
                                    ]
                                },
                                "specifiers": [],
                                "complements": [],
                                "translation": {}
                            }
                        ],
                        "translation": {
                            "base": "{C1[を]}持っている",
                            "imperfect": "{C1[を]}持ってい"
                        }
                    }
                ]
            }
        ],
        "x": 944,
        "y": 128,
        "color": "tomato",
        "children": [
            {
                "id": "head",
                "type": "dropdown",
                "content": [
                    "have",
                    "has"
                ],
                "selected": 0,
                "hidden": false,
                "keepEmpty": false
            },
            {
                "id": "complement",
                "type": "placeholder",
                "content": null,
                "hidden": false,
                "keepEmpty": false
            }
        ],
        "translation": " ＿＿を持っている "
    },
    {
        "id": "b6848fa37092f47b5a66abcc35f1f4365",
        "lexicons": [
            {
                "word": "a",
                "categories": [
                    {
                        "base": "DP",
                        "features": {
                            "φ": [
                                "3S"
                            ],
                            "case": [
                                "nom",
                                "acc"
                            ]
                        },
                        "specifiers": [],
                        "complements": [
                            {
                                "base": "NP",
                                "features": {
                                    "φ": [
                                        "3S"
                                    ]
                                },
                                "specifiers": [],
                                "complements": [],
                                "translation": {}
                            }
                        ],
                        "translation": {
                            "base": "(ある1つの){C1}"
                        }
                    }
                ]
            }
        ],
        "x": 452,
        "y": 778,
        "color": "dodgerBlue",
        "isRound": true,
        "children": [
            {
                "id": "head",
                "type": "text",
                "content": "a (an)",
                "hidden": false,
                "keepEmpty": false
            },
            {
                "id": "complement",
                "type": "placeholder",
                "content": null,
                "hidden": false,
                "keepEmpty": false
            }
        ],
        "translation": " (ある1つの)＿＿ "
    },
    {
        "id": "be0da27c3823942c4b4d0b22aae1127ca",
        "lexicons": [
            {
                "word": "book",
                "categories": [
                    {
                        "base": "NP",
                        "features": {
                            "φ": [
                                "3S"
                            ]
                        },
                        "specifiers": [],
                        "complements": [],
                        "translation": {
                            "base": "本"
                        }
                    }
                ]
            },
            {
                "word": "books",
                "categories": [
                    {
                        "base": "NP",
                        "features": {
                            "φ": [
                                "3P"
                            ]
                        },
                        "specifiers": [],
                        "complements": [],
                        "translation": {
                            "base": "本"
                        }
                    },
                    {
                        "base": "DP",
                        "features": {
                            "φ": [
                                "3P"
                            ],
                            "case": [
                                "nom",
                                "acc"
                            ]
                        },
                        "specifiers": [],
                        "complements": [],
                        "translation": {
                            "base": "本"
                        }
                    }
                ]
            }
        ],
        "x": 722,
        "y": 496,
        "color": "dodgerBlue",
        "isRound": true,
        "children": [
            {
                "id": "head",
                "type": "dropdown",
                "content": [
                    "book",
                    "books"
                ],
                "selected": 0,
                "hidden": false,
                "keepEmpty": false
            }
        ],
        "translation": " 本 "
    }
]

const SentenceBuilder = () => {
    
    const svgContainerRef = useRef(null);

    useEffect(() => {
        // Select the container from the ref
        const container = d3.select(svgContainerRef.current);
        container.selectAll("*").remove();

        // Create an SVG element inside the container
        const svg = container
            .append("svg")
            .attr("id", "svg")
            .style("background-color", "#f9f9f9");

        // Update SVG size on window resize
        const updateSvgSize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            svg.attr("width", width).attr("height", height);
        };
        updateSvgSize();
        window.addEventListener("resize", updateSvgSize);

        // Create a new Renderer instance with the data and svg element
        new Renderer(blocks, blockList, svg);

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener("resize", updateSvgSize);
        };
    });

    return (
        <>
            <div
                ref={svgContainerRef}
                style={{
                    position: 'fixed',
                }}
            />
        </>
    );
}

export default SentenceBuilder;