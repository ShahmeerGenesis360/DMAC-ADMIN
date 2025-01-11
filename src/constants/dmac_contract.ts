/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/dmac_contracts.json`.
 */
export type DmacContracts = {
  address: "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4";
  metadata: {
    name: "dmacContracts";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "buyIndex";
      discriminator: [86, 210, 44, 69, 83, 254, 77, 11];
      accounts: [
        {
          name: "programState";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [105, 110, 100, 101, 120];
              }
            ];
          };
        },
        {
          name: "user";
          writable: true;
          signer: true;
        },
        {
          name: "indexInfo";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [105, 110, 100, 101, 120, 95, 105, 110, 102, 111];
              },
              {
                kind: "account";
                path: "indexMint";
              }
            ];
          };
        },
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "indexMint";
          writable: true;
        },
        {
          name: "userTokenAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "user";
              },
              {
                kind: "const";
                value: [
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
                ];
              },
              {
                kind: "account";
                path: "indexMint";
              }
            ];
            program: {
              kind: "const";
              value: [
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
              ];
            };
          };
        },
        {
          name: "admin";
          writable: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "tokenProgram";
          address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "priceUpdate";
        }
      ];
      args: [
        {
          name: "amountInLamports";
          type: "u64";
        }
      ];
    },
    {
      name: "createIndex";
      discriminator: [205, 71, 124, 117, 143, 136, 104, 192];
      accounts: [
        {
          name: "programState";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [105, 110, 100, 101, 120];
              }
            ];
          };
        },
        {
          name: "admin";
          writable: true;
          signer: true;
        },
        {
          name: "indexInfo";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [105, 110, 100, 101, 120, 95, 105, 110, 102, 111];
              },
              {
                kind: "account";
                path: "indexMint";
              }
            ];
          };
        },
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "indexMint";
          writable: true;
          signer: true;
        },
        {
          name: "adminTokenAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "admin";
              },
              {
                kind: "const";
                value: [
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
                ];
              },
              {
                kind: "account";
                path: "indexMint";
              }
            ];
            program: {
              kind: "const";
              value: [
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
              ];
            };
          };
        },
        {
          name: "priceUpdate";
        },
        {
          name: "tokenProgram";
          address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        }
      ];
      args: [
        {
          name: "name";
          type: "string";
        },
        {
          name: "description";
          type: "string";
        },
        {
          name: "indexTokens";
          type: {
            vec: {
              defined: {
                name: "indexToken";
              };
            };
          };
        },
        {
          name: "lamports";
          type: {
            option: "u64";
          };
        }
      ];
    },
    {
      name: "execute";
      discriminator: [105, 37, 101, 197, 75, 251, 102, 26];
      accounts: [
        {
          name: "sourceToken";
        },
        {
          name: "mint";
        },
        {
          name: "destinationToken";
        },
        {
          name: "owner";
        },
        {
          name: "extraAccountMetaList";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
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
                ];
              },
              {
                kind: "account";
                path: "mint";
              }
            ];
          };
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "initialize";
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [
        {
          name: "programState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [105, 110, 100, 101, 120];
              }
            ];
          };
        },
        {
          name: "admin";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "admin";
          type: "pubkey";
        },
        {
          name: "platformFeeBps";
          type: "u64";
        }
      ];
    },
    {
      name: "rebalanceIndex";
      discriminator: [164, 102, 182, 181, 177, 223, 91, 197];
      accounts: [
        {
          name: "programAuthority";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 117, 116, 104, 111, 114, 105, 116, 121];
              }
            ];
          };
        },
        {
          name: "programWsolAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [119, 115, 111, 108];
              }
            ];
          };
        },
        {
          name: "userAccount";
          signer: true;
        },
        {
          name: "solMint";
          address: "So11111111111111111111111111111111111111112";
        },
        {
          name: "jupiterProgram";
          address: "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4";
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "programState";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [105, 110, 100, 101, 120];
              }
            ];
          };
        },
        {
          name: "indexMint";
        },
        {
          name: "indexInfo";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [105, 110, 100, 101, 120, 95, 105, 110, 102, 111];
              },
              {
                kind: "account";
                path: "indexMint";
              }
            ];
          };
        },
        {
          name: "rebalanceInfo";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [114, 101, 98, 97, 108, 97, 110, 99, 101];
              },
              {
                kind: "account";
                path: "indexMint";
              }
            ];
          };
        },
        {
          name: "priceUpdate";
        }
      ];
      args: [
        {
          name: "data";
          type: "bytes";
        }
      ];
    },
    {
      name: "rebalanceIndexEnd";
      discriminator: [76, 203, 153, 127, 214, 176, 32, 238];
      accounts: [
        {
          name: "programState";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [105, 110, 100, 101, 120];
              }
            ];
          };
        },
        {
          name: "admin";
          signer: true;
        },
        {
          name: "indexMint";
        },
        {
          name: "indexInfo";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [105, 110, 100, 101, 120, 95, 105, 110, 102, 111];
              },
              {
                kind: "account";
                path: "indexMint";
              }
            ];
          };
        },
        {
          name: "rebalanceInfo";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [114, 101, 98, 97, 108, 97, 110, 99, 101];
              },
              {
                kind: "account";
                path: "indexMint";
              }
            ];
          };
        }
      ];
      args: [];
    },
    {
      name: "rebalanceIndexStart";
      discriminator: [200, 9, 167, 166, 249, 167, 254, 9];
      accounts: [
        {
          name: "programState";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [105, 110, 100, 101, 120];
              }
            ];
          };
        },
        {
          name: "admin";
          writable: true;
          signer: true;
        },
        {
          name: "indexMint";
        },
        {
          name: "indexInfo";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [105, 110, 100, 101, 120, 95, 105, 110, 102, 111];
              },
              {
                kind: "account";
                path: "indexMint";
              }
            ];
          };
        },
        {
          name: "rebalanceInfo";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [114, 101, 98, 97, 108, 97, 110, 99, 101];
              },
              {
                kind: "account";
                path: "indexMint";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "weights";
          type: {
            vec: "u64";
          };
        }
      ];
    },
    {
      name: "sellIndex";
      discriminator: [46, 208, 188, 9, 9, 157, 218, 103];
      accounts: [
        {
          name: "programState";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [105, 110, 100, 101, 120];
              }
            ];
          };
        },
        {
          name: "user";
          writable: true;
          signer: true;
        },
        {
          name: "indexInfo";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [105, 110, 100, 101, 120, 95, 105, 110, 102, 111];
              },
              {
                kind: "account";
                path: "indexMint";
              }
            ];
          };
        },
        {
          name: "swapToSolInfo";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [115, 119, 97, 112, 95, 116, 111, 95, 115, 111, 108];
              },
              {
                kind: "account";
                path: "indexMint";
              },
              {
                kind: "account";
                path: "user";
              }
            ];
          };
        },
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "indexMint";
          writable: true;
        },
        {
          name: "userTokenAccount";
          writable: true;
        },
        {
          name: "admin";
          writable: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "tokenProgram";
          address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
        },
        {
          name: "priceUpdate";
        }
      ];
      args: [
        {
          name: "amountInIndex";
          type: "u64";
        }
      ];
    },
    {
      name: "swapToSol";
      discriminator: [18, 60, 255, 39, 102, 128, 62, 140];
      accounts: [
        {
          name: "programAuthority";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 117, 116, 104, 111, 114, 105, 116, 121];
              }
            ];
          };
        },
        {
          name: "programWsolAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [119, 115, 111, 108];
              }
            ];
          };
        },
        {
          name: "userAccount";
          signer: true;
        },
        {
          name: "solMint";
          address: "So11111111111111111111111111111111111111112";
        },
        {
          name: "jupiterProgram";
          address: "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4";
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "programState";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [105, 110, 100, 101, 120];
              }
            ];
          };
        },
        {
          name: "indexMint";
        },
        {
          name: "indexInfo";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [105, 110, 100, 101, 120, 95, 105, 110, 102, 111];
              },
              {
                kind: "account";
                path: "indexMint";
              }
            ];
          };
        },
        {
          name: "swapToSolInfo";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [115, 119, 97, 112, 95, 116, 111, 95, 115, 111, 108];
              },
              {
                kind: "account";
                path: "indexMint";
              },
              {
                kind: "account";
                path: "user";
              }
            ];
          };
        },
        {
          name: "user";
        },
        {
          name: "priceUpdate";
        }
      ];
      args: [
        {
          name: "data";
          type: "bytes";
        }
      ];
    },
    {
      name: "swapToSolEnd";
      discriminator: [142, 206, 199, 211, 237, 96, 228, 14];
      accounts: [
        {
          name: "programState";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [105, 110, 100, 101, 120];
              }
            ];
          };
        },
        {
          name: "admin";
          writable: true;
          signer: true;
        },
        {
          name: "indexMint";
          writable: true;
        },
        {
          name: "indexInfo";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [105, 110, 100, 101, 120, 95, 105, 110, 102, 111];
              },
              {
                kind: "account";
                path: "indexMint";
              }
            ];
          };
        },
        {
          name: "swapToSolInfo";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [115, 119, 97, 112, 95, 116, 111, 95, 115, 111, 108];
              },
              {
                kind: "account";
                path: "indexMint";
              },
              {
                kind: "account";
                path: "userAccount";
              }
            ];
          };
        },
        {
          name: "userAccount";
          writable: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "swapToTkn";
      discriminator: [80, 39, 88, 32, 212, 25, 238, 58];
      accounts: [
        {
          name: "programAuthority";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 117, 116, 104, 111, 114, 105, 116, 121];
              }
            ];
          };
        },
        {
          name: "programWsolAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [119, 115, 111, 108];
              }
            ];
          };
        },
        {
          name: "userAccount";
          signer: true;
        },
        {
          name: "solMint";
          address: "So11111111111111111111111111111111111111112";
        },
        {
          name: "jupiterProgram";
          address: "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4";
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "programState";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [105, 110, 100, 101, 120];
              }
            ];
          };
        },
        {
          name: "indexMint";
          writable: true;
        },
        {
          name: "indexInfo";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [105, 110, 100, 101, 120, 95, 105, 110, 102, 111];
              },
              {
                kind: "account";
                path: "indexMint";
              }
            ];
          };
        },
        {
          name: "swapToTknInfo";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [115, 119, 97, 112, 95, 116, 111, 95, 116, 107, 110];
              },
              {
                kind: "account";
                path: "indexMint";
              }
            ];
          };
        }
      ];
      args: [
        {
          name: "data";
          type: "bytes";
        }
      ];
    },
    {
      name: "swapToTknEnd";
      discriminator: [71, 214, 10, 217, 163, 3, 246, 51];
      accounts: [
        {
          name: "programState";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [105, 110, 100, 101, 120];
              }
            ];
          };
        },
        {
          name: "admin";
          writable: true;
          signer: true;
        },
        {
          name: "indexMint";
          writable: true;
        },
        {
          name: "indexInfo";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [105, 110, 100, 101, 120, 95, 105, 110, 102, 111];
              },
              {
                kind: "account";
                path: "indexMint";
              }
            ];
          };
        },
        {
          name: "swapToTknInfo";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [115, 119, 97, 112, 95, 116, 111, 95, 116, 107, 110];
              },
              {
                kind: "account";
                path: "indexMint";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "swapToTknStart";
      discriminator: [84, 68, 38, 72, 60, 224, 124, 68];
      accounts: [
        {
          name: "programState";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [105, 110, 100, 101, 120];
              }
            ];
          };
        },
        {
          name: "admin";
          writable: true;
          signer: true;
        },
        {
          name: "indexMint";
          writable: true;
        },
        {
          name: "indexInfo";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [105, 110, 100, 101, 120, 95, 105, 110, 102, 111];
              },
              {
                kind: "account";
                path: "indexMint";
              }
            ];
          };
        },
        {
          name: "swapToTknInfo";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [115, 119, 97, 112, 95, 116, 111, 95, 116, 107, 110];
              },
              {
                kind: "account";
                path: "indexMint";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: "indexInfo";
      discriminator: [128, 242, 45, 142, 63, 19, 49, 46];
    },
    {
      name: "priceUpdateV2";
      discriminator: [34, 241, 35, 99, 157, 126, 244, 205];
    },
    {
      name: "programState";
      discriminator: [77, 209, 137, 229, 149, 67, 167, 230];
    },
    {
      name: "rebalanceInfo";
      discriminator: [136, 79, 124, 99, 165, 26, 245, 112];
    },
    {
      name: "swapToSolInfo";
      discriminator: [109, 95, 60, 208, 113, 143, 219, 112];
    },
    {
      name: "swapToTokenInfo";
      discriminator: [70, 171, 254, 41, 1, 151, 189, 72];
    }
  ];
  events: [
    {
      name: "dmacBuyIndexEvent";
      discriminator: [165, 55, 219, 78, 238, 73, 199, 174];
    },
    {
      name: "dmacCreateIndexEvent";
      discriminator: [86, 182, 175, 217, 69, 28, 99, 245];
    },
    {
      name: "dmacRebalanceIndexEndEvent";
      discriminator: [53, 146, 220, 134, 110, 126, 168, 48];
    },
    {
      name: "dmacRebalanceIndexEvent";
      discriminator: [75, 10, 229, 84, 86, 226, 11, 27];
    },
    {
      name: "dmacRebalanceIndexStartEvent";
      discriminator: [19, 47, 111, 28, 139, 248, 180, 186];
    },
    {
      name: "dmacSellIndexEvent";
      discriminator: [120, 190, 99, 64, 213, 130, 46, 145];
    },
    {
      name: "dmacSwapToSolanaEvent";
      discriminator: [79, 193, 242, 26, 101, 159, 5, 255];
    },
    {
      name: "dmacSwapToTokenEndEvent";
      discriminator: [175, 170, 170, 150, 160, 218, 7, 157];
    },
    {
      name: "dmacSwapToTokenEvent";
      discriminator: [224, 196, 4, 224, 87, 250, 146, 211];
    },
    {
      name: "dmacSwapToTokenSolanaEvent";
      discriminator: [1, 252, 250, 253, 225, 166, 13, 152];
    },
    {
      name: "dmacSwapToTokenStartEvent";
      discriminator: [143, 251, 147, 168, 121, 7, 237, 159];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "unauthorized";
      msg: "You are not authorized to perform this action.";
    },
    {
      code: 6001;
      name: "invalidInput";
      msg: "The input data is invalid.";
    },
    {
      code: 6002;
      name: "invalidWeight";
      msg: "The target weights must sum to 100%.";
    },
    {
      code: 6003;
      name: "indexNotActive";
      msg: "The index is not active.";
    },
    {
      code: 6004;
      name: "invalidDepositAmount";
      msg: "Invalid deposit amount.";
    },
    {
      code: 6005;
      name: "isNotCurrentlyTransferring";
      msg: "The token is not currently transferring";
    },
    {
      code: 6006;
      name: "incorrectTokenMint";
      msg: "Incorrect Token Mint to swap";
    },
    {
      code: 6007;
      name: "incompleteSwapToTokenCycle";
      msg: "Swap to token cycle is not complete";
    },
    {
      code: 6008;
      name: "completedSwapToTokenCycle";
      msg: "Swap to token cycle is complete";
    },
    {
      code: 6009;
      name: "allTokensAlreadyRebalanced";
      msg: "All tokens are already rebalanced";
    },
    {
      code: 6010;
      name: "tokenAlreadyRebalanced";
      msg: "Token is already rebalanced";
    },
    {
      code: 6011;
      name: "incompleteRebalanceCycle";
      msg: "Rebalance cycle is not complete";
    },
    {
      code: 6012;
      name: "incorrectRebalanceWeightsCount";
      msg: "Incorrect no of rebalance weights";
    },
    {
      code: 6013;
      name: "invalidReturnData";
    },
    {
      code: 6014;
      name: "invalidJupiterProgram";
    },
    {
      code: 6015;
      name: "incorrectOwner";
    }
  ];
  types: [
    {
      name: "dmacBuyIndexEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "indexMint";
            type: "pubkey";
          },
          {
            name: "deposited";
            type: "u64";
          },
          {
            name: "minted";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "dmacCreateIndexEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "indexMint";
            type: "pubkey";
          },
          {
            name: "tokens";
            type: "u64";
          },
          {
            name: "initialSupply";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "dmacRebalanceIndexEndEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "indexMint";
            type: "pubkey";
          }
        ];
      };
    },
    {
      name: "dmacRebalanceIndexEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "indexMint";
            type: "pubkey";
          }
        ];
      };
    },
    {
      name: "dmacRebalanceIndexStartEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "indexMint";
            type: "pubkey";
          }
        ];
      };
    },
    {
      name: "dmacSellIndexEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "indexMint";
            type: "pubkey";
          },
          {
            name: "withdrawn";
            type: "u64";
          },
          {
            name: "burned";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "dmacSwapToSolanaEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "indexMint";
            type: "pubkey";
          },
          {
            name: "tokenMint";
            type: "pubkey";
          }
        ];
      };
    },
    {
      name: "dmacSwapToTokenEndEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "indexMint";
            type: "pubkey";
          },
          {
            name: "tokens";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "dmacSwapToTokenEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "indexMint";
            type: "pubkey";
          },
          {
            name: "tokenMint";
            type: "pubkey";
          }
        ];
      };
    },
    {
      name: "dmacSwapToTokenSolanaEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "indexMint";
            type: "pubkey";
          },
          {
            name: "tokens";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "dmacSwapToTokenStartEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "indexMint";
            type: "pubkey";
          },
          {
            name: "solToSwap";
            type: "u64";
          },
          {
            name: "tokens";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "indexInfo";
      type: {
        kind: "struct";
        fields: [
          {
            name: "indexTokens";
            type: {
              vec: {
                defined: {
                  name: "indexToken";
                };
              };
            };
          },
          {
            name: "totalValue";
            type: "u64";
          },
          {
            name: "totalSupply";
            type: "u64";
          },
          {
            name: "name";
            type: "string";
          },
          {
            name: "description";
            type: "string";
          },
          {
            name: "status";
            type: "u8";
          },
          {
            name: "lastRebalanceTs";
            type: "i64";
          },
          {
            name: "solToSwap";
            type: "u64";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "indexToken";
      type: {
        kind: "struct";
        fields: [
          {
            name: "mint";
            type: "pubkey";
          },
          {
            name: "weight";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "priceFeedMessage";
      repr: {
        kind: "c";
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "feedId";
            docs: [
              "`FeedId` but avoid the type alias because of compatibility issues with Anchor's `idl-build` feature."
            ];
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "price";
            type: "i64";
          },
          {
            name: "conf";
            type: "u64";
          },
          {
            name: "exponent";
            type: "i32";
          },
          {
            name: "publishTime";
            docs: ["The timestamp of this price update in seconds"];
            type: "i64";
          },
          {
            name: "prevPublishTime";
            docs: [
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
            ];
            type: "i64";
          },
          {
            name: "emaPrice";
            type: "i64";
          },
          {
            name: "emaConf";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "priceUpdateV2";
      docs: [
        "A price update account. This account is used by the Pyth Receiver program to store a verified price update from a Pyth price feed.",
        "It contains:",
        "- `write_authority`: The write authority for this account. This authority can close this account to reclaim rent or update the account to contain a different price update.",
        "- `verification_level`: The [`VerificationLevel`] of this price update. This represents how many Wormhole guardian signatures have been verified for this price update.",
        "- `price_message`: The actual price update.",
        "- `posted_slot`: The slot at which this price update was posted."
      ];
      type: {
        kind: "struct";
        fields: [
          {
            name: "writeAuthority";
            type: "pubkey";
          },
          {
            name: "verificationLevel";
            type: {
              defined: {
                name: "verificationLevel";
              };
            };
          },
          {
            name: "priceMessage";
            type: {
              defined: {
                name: "priceFeedMessage";
              };
            };
          },
          {
            name: "postedSlot";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "programState";
      type: {
        kind: "struct";
        fields: [
          {
            name: "admin";
            type: "pubkey";
          },
          {
            name: "platformFeeBps";
            type: "u64";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "rebalanceInfo";
      type: {
        kind: "struct";
        fields: [
          {
            name: "weights";
            type: {
              vec: "u64";
            };
          }
        ];
      };
    },
    {
      name: "swapToSolInfo";
      type: {
        kind: "struct";
        fields: [
          {
            name: "solToWithdraw";
            type: "u64";
          },
          {
            name: "swappedTokens";
            type: {
              vec: "bool";
            };
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "swapToTokenInfo";
      type: {
        kind: "struct";
        fields: [
          {
            name: "solToSwap";
            type: "u64";
          },
          {
            name: "swappedTokens";
            type: {
              vec: "bool";
            };
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "verificationLevel";
      docs: [
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
      ];
      type: {
        kind: "enum";
        variants: [
          {
            name: "partial";
            fields: [
              {
                name: "numSignatures";
                type: "u8";
              }
            ];
          },
          {
            name: "full";
          }
        ];
      };
    }
  ];
};
