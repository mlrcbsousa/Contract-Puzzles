const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    const signers = [...Array(10).keys()].map(i => ethers.provider.getSigner(0));

    return { game, signers };
  }
  it('should be a winner', async function () {
    const { game, signers } = await loadFixture(deployContractAndSetVariables);

    // good luck

    signers.forEach(async (signer, i) => {
      const address = await signer.getAddress();

      try {
        await game.connect(signer).win(address)
      } catch (error) {
        console.log(i);
      }
    })

    // await game.win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
