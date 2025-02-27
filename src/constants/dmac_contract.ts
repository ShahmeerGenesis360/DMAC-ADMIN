/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/dmac_contracts.json`.
 */
export type DmacContracts = {
  "address": "3iV7RjTsb2iYrc4Jjp49VBM37BpxktiP7sRW41LX7idQ",
  "metadata": {
    "name": "dmac_contracts",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "buy_index",
      "discriminator": [
        86,
        210,
        44,
        69,
        83,
        254,
        77,
        11
      ],
      "accounts": [
        {
          "name": "program_state",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  100,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "index_info",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  100,
                  101,
                  120,
                  95,
                  105,
                  110,
                  102,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "index_mint"
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "index_mint",
          "writable": true
        },
        {
          "name": "user_token_account",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "index_mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "admin",
          "writable": true
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "token_program",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "associated_token_program",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "price_update"
        },
        {
          "name": "program_authority_pda",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "amount_in_lamports",
          "type": "u64"
        }
      ]
    },
    {
      "name": "create_index",
      "discriminator": [
        205,
        71,
        124,
        117,
        143,
        136,
        104,
        192
      ],
      "accounts": [
        {
          "name": "program_state",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  100,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "index_info",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  100,
                  101,
                  120,
                  95,
                  105,
                  110,
                  102,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "index_mint"
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "index_mint",
          "writable": true,
          "signer": true
        },
        {
          "name": "price_update"
        },
        {
          "name": "token_program",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "program_authority_pda",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        },
        {
          "name": "index_tokens",
          "type": {
            "vec": {
              "defined": {
                "name": "IndexToken"
              }
            }
          }
        },
        {
          "name": "fee_collectors",
          "type": {
            "vec": {
              "defined": {
                "name": "FeeCollector"
              }
            }
          }
        },
        {
          "name": "lamports",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "platform_fee_bps",
          "type": {
            "option": "u64"
          }
        }
      ]
    },
    {
      "name": "execute",
      "discriminator": [
        105,
        37,
        101,
        197,
        75,
        251,
        102,
        26
      ],
      "accounts": [
        {
          "name": "source_token"
        },
        {
          "name": "mint"
        },
        {
          "name": "destination_token"
        },
        {
          "name": "owner"
        },
        {
          "name": "extra_account_meta_list",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  120,
                  116,
                  114,
                  97,
                  45,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116,
                  45,
                  109,
                  101,
                  116,
                  97,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "_amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "program_state",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  100,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "admin",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "mint_index",
      "discriminator": [
        105,
        223,
        80,
        228,
        4,
        250,
        161,
        35
      ],
      "accounts": [
        {
          "name": "program_state",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  100,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "index_info",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  100,
                  101,
                  120,
                  95,
                  105,
                  110,
                  102,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "index_mint"
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "index_mint",
          "writable": true
        },
        {
          "name": "admin_token_account",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "admin"
              },
              {
                "kind": "account",
                "path": "token_program"
              },
              {
                "kind": "account",
                "path": "index_mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "token_program",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "associated_token_program",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": []
    },
    {
      "name": "rebalance_index",
      "discriminator": [
        164,
        102,
        182,
        181,
        177,
        223,
        91,
        197
      ],
      "accounts": [
        {
          "name": "program_authority",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program_wsol_account",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  115,
                  111,
                  108
                ]
              }
            ]
          }
        },
        {
          "name": "user_account",
          "writable": true,
          "signer": true
        },
        {
          "name": "sol_mint",
          "address": "So11111111111111111111111111111111111111112"
        },
        {
          "name": "jupiter_program",
          "address": "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4"
        },
        {
          "name": "token_program",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "wsol_token_account",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "user_account"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "sol_mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "token_mint"
        },
        {
          "name": "admin_token_account",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "user_account"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "token_mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "pda_token_account",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "program_authority_pda"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "token_mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "program_state",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  100,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "index_mint"
        },
        {
          "name": "index_info",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  100,
                  101,
                  120,
                  95,
                  105,
                  110,
                  102,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "index_mint"
              }
            ]
          }
        },
        {
          "name": "rebalance_info",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  98,
                  97,
                  108,
                  97,
                  110,
                  99,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "index_mint"
              }
            ]
          }
        },
        {
          "name": "price_update"
        },
        {
          "name": "program_authority_pda",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "data",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "rebalance_index_end",
      "discriminator": [
        76,
        203,
        153,
        127,
        214,
        176,
        32,
        238
      ],
      "accounts": [
        {
          "name": "program_state",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  100,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "admin",
          "signer": true
        },
        {
          "name": "index_mint"
        },
        {
          "name": "index_info",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  100,
                  101,
                  120,
                  95,
                  105,
                  110,
                  102,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "index_mint"
              }
            ]
          }
        },
        {
          "name": "rebalance_info",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  98,
                  97,
                  108,
                  97,
                  110,
                  99,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "index_mint"
              }
            ]
          }
        }
      ],
      "args": []
    },
    {
      "name": "rebalance_index_start",
      "discriminator": [
        200,
        9,
        167,
        166,
        249,
        167,
        254,
        9
      ],
      "accounts": [
        {
          "name": "program_state",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  100,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "index_mint"
        },
        {
          "name": "index_info",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  100,
                  101,
                  120,
                  95,
                  105,
                  110,
                  102,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "index_mint"
              }
            ]
          }
        },
        {
          "name": "rebalance_info",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  98,
                  97,
                  108,
                  97,
                  110,
                  99,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "index_mint"
              }
            ]
          }
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "weights",
          "type": {
            "vec": "u64"
          }
        }
      ]
    },
    {
      "name": "remove_index",
      "discriminator": [
        89,
        135,
        171,
        14,
        78,
        181,
        228,
        8
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "index_mint",
          "writable": true
        },
        {
          "name": "index_info",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  100,
                  101,
                  120,
                  95,
                  105,
                  110,
                  102,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "index_mint"
              }
            ]
          }
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "sell_index",
      "discriminator": [
        46,
        208,
        188,
        9,
        9,
        157,
        218,
        103
      ],
      "accounts": [
        {
          "name": "program_state",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  100,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "index_info",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  100,
                  101,
                  120,
                  95,
                  105,
                  110,
                  102,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "index_mint"
              }
            ]
          }
        },
        {
          "name": "swap_to_sol_info",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  119,
                  97,
                  112,
                  95,
                  116,
                  111,
                  95,
                  115,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "index_mint"
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "index_mint",
          "writable": true
        },
        {
          "name": "user_token_account",
          "writable": true
        },
        {
          "name": "admin",
          "writable": true
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "token_program",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "price_update"
        }
      ],
      "args": [
        {
          "name": "amount_in_index",
          "type": "u64"
        }
      ]
    },
    {
      "name": "swap_to_sol",
      "discriminator": [
        18,
        60,
        255,
        39,
        102,
        128,
        62,
        140
      ],
      "accounts": [
        {
          "name": "program_authority",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program_wsol_account",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  115,
                  111,
                  108
                ]
              }
            ]
          }
        },
        {
          "name": "user_account",
          "writable": true,
          "signer": true
        },
        {
          "name": "sol_mint",
          "address": "So11111111111111111111111111111111111111112"
        },
        {
          "name": "jupiter_program",
          "address": "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4"
        },
        {
          "name": "token_program",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "associated_token_program",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "token_mint"
        },
        {
          "name": "admin_token_account",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "user_account"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "token_mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "pda_token_account",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "program_authority_pda"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "token_mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "program_state",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  100,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "index_mint"
        },
        {
          "name": "index_info",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  100,
                  101,
                  120,
                  95,
                  105,
                  110,
                  102,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "index_mint"
              }
            ]
          }
        },
        {
          "name": "swap_to_sol_info",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  119,
                  97,
                  112,
                  95,
                  116,
                  111,
                  95,
                  115,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "index_mint"
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "user"
        },
        {
          "name": "price_update"
        },
        {
          "name": "program_authority_pda",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "token_amount_in_decimals",
          "type": "u64"
        },
        {
          "name": "data",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "swap_to_sol_end",
      "discriminator": [
        142,
        206,
        199,
        211,
        237,
        96,
        228,
        14
      ],
      "accounts": [
        {
          "name": "program_state",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  100,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "index_mint",
          "writable": true
        },
        {
          "name": "index_info",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  100,
                  101,
                  120,
                  95,
                  105,
                  110,
                  102,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "index_mint"
              }
            ]
          }
        },
        {
          "name": "swap_to_sol_info",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  119,
                  97,
                  112,
                  95,
                  116,
                  111,
                  95,
                  115,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "index_mint"
              },
              {
                "kind": "account",
                "path": "user_account"
              }
            ]
          }
        },
        {
          "name": "user_account",
          "writable": true
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "swap_to_tkn",
      "discriminator": [
        80,
        39,
        88,
        32,
        212,
        25,
        238,
        58
      ],
      "accounts": [
        {
          "name": "program_authority",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program_wsol_account",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  115,
                  111,
                  108
                ]
              }
            ]
          }
        },
        {
          "name": "user_account",
          "writable": true,
          "signer": true
        },
        {
          "name": "sol_mint",
          "address": "So11111111111111111111111111111111111111112"
        },
        {
          "name": "jupiter_program",
          "address": "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4"
        },
        {
          "name": "token_program",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "wsol_token_account",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "user_account"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "sol_mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "token_mint"
        },
        {
          "name": "admin_token_account",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "user_account"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "token_mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "pda_token_account",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "program_authority_pda"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "token_mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "program_state",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  100,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "index_mint",
          "writable": true
        },
        {
          "name": "index_info",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  100,
                  101,
                  120,
                  95,
                  105,
                  110,
                  102,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "index_mint"
              }
            ]
          }
        },
        {
          "name": "swap_to_tkn_info",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  119,
                  97,
                  112,
                  95,
                  116,
                  111,
                  95,
                  116,
                  107,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "index_mint"
              }
            ]
          }
        },
        {
          "name": "program_authority_pda",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "data",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "swap_to_tkn_end",
      "discriminator": [
        71,
        214,
        10,
        217,
        163,
        3,
        246,
        51
      ],
      "accounts": [
        {
          "name": "program_state",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  100,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "index_mint",
          "writable": true
        },
        {
          "name": "index_info",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  100,
                  101,
                  120,
                  95,
                  105,
                  110,
                  102,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "index_mint"
              }
            ]
          }
        },
        {
          "name": "swap_to_tkn_info",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  119,
                  97,
                  112,
                  95,
                  116,
                  111,
                  95,
                  116,
                  107,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "index_mint"
              }
            ]
          }
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "swap_to_tkn_start",
      "discriminator": [
        84,
        68,
        38,
        72,
        60,
        224,
        124,
        68
      ],
      "accounts": [
        {
          "name": "program_state",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  100,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "index_mint",
          "writable": true
        },
        {
          "name": "index_info",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  100,
                  101,
                  120,
                  95,
                  105,
                  110,
                  102,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "index_mint"
              }
            ]
          }
        },
        {
          "name": "swap_to_tkn_info",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  119,
                  97,
                  112,
                  95,
                  116,
                  111,
                  95,
                  116,
                  107,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "index_mint"
              }
            ]
          }
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "uninitialize",
      "discriminator": [
        28,
        100,
        144,
        220,
        7,
        87,
        131,
        90
      ],
      "accounts": [
        {
          "name": "program_state",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  100,
                  101,
                  120
                ]
              }
            ]
          }
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "IndexInfo",
      "discriminator": [
        128,
        242,
        45,
        142,
        63,
        19,
        49,
        46
      ]
    },
    {
      "name": "PriceUpdateV2",
      "discriminator": [
        34,
        241,
        35,
        99,
        157,
        126,
        244,
        205
      ]
    },
    {
      "name": "ProgramState",
      "discriminator": [
        77,
        209,
        137,
        229,
        149,
        67,
        167,
        230
      ]
    },
    {
      "name": "RebalanceInfo",
      "discriminator": [
        136,
        79,
        124,
        99,
        165,
        26,
        245,
        112
      ]
    },
    {
      "name": "SwapToSolInfo",
      "discriminator": [
        109,
        95,
        60,
        208,
        113,
        143,
        219,
        112
      ]
    },
    {
      "name": "SwapToTokenInfo",
      "discriminator": [
        70,
        171,
        254,
        41,
        1,
        151,
        189,
        72
      ]
    }
  ],
  "events": [
    {
      "name": "DmacBuyIndexEvent",
      "discriminator": [
        165,
        55,
        219,
        78,
        238,
        73,
        199,
        174
      ]
    },
    {
      "name": "DmacCreateIndexEvent",
      "discriminator": [
        86,
        182,
        175,
        217,
        69,
        28,
        99,
        245
      ]
    },
    {
      "name": "DmacRebalanceIndexEndEvent",
      "discriminator": [
        53,
        146,
        220,
        134,
        110,
        126,
        168,
        48
      ]
    },
    {
      "name": "DmacRebalanceIndexEvent",
      "discriminator": [
        75,
        10,
        229,
        84,
        86,
        226,
        11,
        27
      ]
    },
    {
      "name": "DmacRebalanceIndexStartEvent",
      "discriminator": [
        19,
        47,
        111,
        28,
        139,
        248,
        180,
        186
      ]
    },
    {
      "name": "DmacSellIndexEvent",
      "discriminator": [
        120,
        190,
        99,
        64,
        213,
        130,
        46,
        145
      ]
    },
    {
      "name": "DmacSwapToSolanaEvent",
      "discriminator": [
        79,
        193,
        242,
        26,
        101,
        159,
        5,
        255
      ]
    },
    {
      "name": "DmacSwapToTokenEndEvent",
      "discriminator": [
        175,
        170,
        170,
        150,
        160,
        218,
        7,
        157
      ]
    },
    {
      "name": "DmacSwapToTokenEvent",
      "discriminator": [
        224,
        196,
        4,
        224,
        87,
        250,
        146,
        211
      ]
    },
    {
      "name": "DmacSwapToTokenSolanaEvent",
      "discriminator": [
        1,
        252,
        250,
        253,
        225,
        166,
        13,
        152
      ]
    },
    {
      "name": "DmacSwapToTokenStartEvent",
      "discriminator": [
        143,
        251,
        147,
        168,
        121,
        7,
        237,
        159
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unauthorized",
      "msg": "You are not authorized to perform this action."
    },
    {
      "code": 6001,
      "name": "InvalidInput",
      "msg": "The input data is invalid."
    },
    {
      "code": 6002,
      "name": "InvalidTokenWeight",
      "msg": "The target weights must sum to 100%."
    },
    {
      "code": 6003,
      "name": "InvalidFeeWeight",
      "msg": "The target weights must sum to 100%."
    },
    {
      "code": 6004,
      "name": "IndexNotActive",
      "msg": "The index is not active."
    },
    {
      "code": 6005,
      "name": "InvalidDepositAmount",
      "msg": "Invalid deposit amount."
    },
    {
      "code": 6006,
      "name": "IsNotCurrentlyTransferring",
      "msg": "The token is not currently transferring"
    },
    {
      "code": 6007,
      "name": "IncorrectTokenMint",
      "msg": "Incorrect Token Mint to swap"
    },
    {
      "code": 6008,
      "name": "IncompleteSwapToTokenCycle",
      "msg": "Swap to token cycle is not complete"
    },
    {
      "code": 6009,
      "name": "CompletedSwapToTokenCycle",
      "msg": "Swap to token cycle is complete"
    },
    {
      "code": 6010,
      "name": "AllTokensAlreadyRebalanced",
      "msg": "All tokens are already rebalanced"
    },
    {
      "code": 6011,
      "name": "TokenAlreadyRebalanced",
      "msg": "Token is already rebalanced"
    },
    {
      "code": 6012,
      "name": "IncompleteRebalanceCycle",
      "msg": "Rebalance cycle is not complete"
    },
    {
      "code": 6013,
      "name": "IncorrectRebalanceWeightsCount",
      "msg": "Incorrect no of rebalance weights"
    },
    {
      "code": 6014,
      "name": "InvalidFeeCollectors",
      "msg": "Invalid fee collector list"
    },
    {
      "code": 6015,
      "name": "InvalidReturnData"
    },
    {
      "code": 6016,
      "name": "InvalidJupiterProgram"
    },
    {
      "code": 6017,
      "name": "IncorrectOwner"
    }
  ],
  "types": [
    {
      "name": "DmacBuyIndexEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "index_mint",
            "type": "pubkey"
          },
          {
            "name": "deposited",
            "type": "f64"
          },
          {
            "name": "minted",
            "type": "f64"
          },
          {
            "name": "admin_fee_buy",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "DmacCreateIndexEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "index_mint",
            "type": "pubkey"
          },
          {
            "name": "tokens",
            "type": "u64"
          },
          {
            "name": "initial_supply",
            "type": "f64"
          }
        ]
      }
    },
    {
      "name": "DmacRebalanceIndexEndEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "index_mint",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "DmacRebalanceIndexEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "index_mint",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "DmacRebalanceIndexStartEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "index_mint",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "DmacSellIndexEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "index_mint",
            "type": "pubkey"
          },
          {
            "name": "withdrawn",
            "type": "f64"
          },
          {
            "name": "burned",
            "type": "u64"
          },
          {
            "name": "admin_fee_sell",
            "type": "f64"
          }
        ]
      }
    },
    {
      "name": "DmacSwapToSolanaEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "index_mint",
            "type": "pubkey"
          },
          {
            "name": "token_mint",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "DmacSwapToTokenEndEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "index_mint",
            "type": "pubkey"
          },
          {
            "name": "tokens",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "DmacSwapToTokenEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "index_mint",
            "type": "pubkey"
          },
          {
            "name": "token_mint",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "DmacSwapToTokenSolanaEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "index_mint",
            "type": "pubkey"
          },
          {
            "name": "tokens",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "DmacSwapToTokenStartEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "index_mint",
            "type": "pubkey"
          },
          {
            "name": "sol_to_swap",
            "type": "u64"
          },
          {
            "name": "tokens",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "FeeCollector",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "collector",
            "type": "pubkey"
          },
          {
            "name": "weight",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "IndexInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "index_tokens",
            "type": {
              "vec": {
                "defined": {
                  "name": "IndexToken"
                }
              }
            }
          },
          {
            "name": "fee_collectors",
            "type": {
              "vec": {
                "defined": {
                  "name": "FeeCollector"
                }
              }
            }
          },
          {
            "name": "total_value",
            "type": "f64"
          },
          {
            "name": "total_supply",
            "type": "f64"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "status",
            "type": "u8"
          },
          {
            "name": "last_rebalance_ts",
            "type": "i64"
          },
          {
            "name": "sol_to_swap",
            "type": "u64"
          },
          {
            "name": "sol_to_swap_fee",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "platform_fee_bps",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "IndexToken",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "weight",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "PriceFeedMessage",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "feed_id",
            "docs": [
              "`FeedId` but avoid the type alias because of compatibility issues with Anchor's `idl-build` feature."
            ],
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "price",
            "type": "i64"
          },
          {
            "name": "conf",
            "type": "u64"
          },
          {
            "name": "exponent",
            "type": "i32"
          },
          {
            "name": "publish_time",
            "docs": [
              "The timestamp of this price update in seconds"
            ],
            "type": "i64"
          },
          {
            "name": "prev_publish_time",
            "docs": [
              "The timestamp of the previous price update. This field is intended to allow users to",
              "identify the single unique price update for any moment in time:",
              "for any time t, the unique update is the one such that prev_publish_time < t <= publish_time.",
              "",
              "Note that there may not be such an update while we are migrating to the new message-sending logic,",
              "as some price updates on pythnet may not be sent to other chains (because the message-sending",
              "logic may not have triggered). We can solve this problem by making the message-sending mandatory",
              "(which we can do once publishers have migrated over).",
              "",
              "Additionally, this field may be equal to publish_time if the message is sent on a slot where",
              "where the aggregation was unsuccesful. This problem will go away once all publishers have",
              "migrated over to a recent version of pyth-agent."
            ],
            "type": "i64"
          },
          {
            "name": "ema_price",
            "type": "i64"
          },
          {
            "name": "ema_conf",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "PriceUpdateV2",
      "docs": [
        "A price update account. This account is used by the Pyth Receiver program to store a verified price update from a Pyth price feed.",
        "It contains:",
        "- `write_authority`: The write authority for this account. This authority can close this account to reclaim rent or update the account to contain a different price update.",
        "- `verification_level`: The [`VerificationLevel`] of this price update. This represents how many Wormhole guardian signatures have been verified for this price update.",
        "- `price_message`: The actual price update.",
        "- `posted_slot`: The slot at which this price update was posted."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "write_authority",
            "type": "pubkey"
          },
          {
            "name": "verification_level",
            "type": {
              "defined": {
                "name": "VerificationLevel"
              }
            }
          },
          {
            "name": "price_message",
            "type": {
              "defined": {
                "name": "PriceFeedMessage"
              }
            }
          },
          {
            "name": "posted_slot",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "ProgramState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "RebalanceInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "weights",
            "type": {
              "vec": "u64"
            }
          }
        ]
      }
    },
    {
      "name": "SwapToSolInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "sol_to_withdraw",
            "type": "u64"
          },
          {
            "name": "swapped_tokens",
            "type": {
              "vec": "bool"
            }
          },
          {
            "name": "sol_to_withdraw_fee",
            "type": "u64"
          },
          {
            "name": "actual_swapped_sol",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "SwapToTokenInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "sol_to_swap",
            "type": "u64"
          },
          {
            "name": "swapped_tokens",
            "type": {
              "vec": "bool"
            }
          },
          {
            "name": "sol_to_swap_fee",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "VerificationLevel",
      "docs": [
        "Pyth price updates are bridged to all blockchains via Wormhole.",
        "Using the price updates on another chain requires verifying the signatures of the Wormhole guardians.",
        "The usual process is to check the signatures for two thirds of the total number of guardians, but this can be cumbersome on Solana because of the transaction size limits,",
        "so we also allow for partial verification.",
        "",
        "This enum represents how much a price update has been verified:",
        "- If `Full`, we have verified the signatures for two thirds of the current guardians.",
        "- If `Partial`, only `num_signatures` guardian signatures have been checked.",
        "",
        "# Warning",
        "Using partially verified price updates is dangerous, as it lowers the threshold of guardians that need to collude to produce a malicious price update."
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Partial",
            "fields": [
              {
                "name": "num_signatures",
                "type": "u8"
              }
            ]
          },
          {
            "name": "Full"
          }
        ]
      }
    }
  ]
}