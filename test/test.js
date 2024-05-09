const MyToken = artifacts.require("MyToken");
const truffleAssert = require('truffle-assertions');

contract("MyToken", (accounts) => {
  const [deployerAccount, recipientAccount, anotherAccount] = accounts;

  it("应该将token的总供应量分配给付款人", async () => {
    const instance = await MyToken.deployed();
    const totalSupply = await instance.totalSupply();
    const deployerBalance = await instance.balanceOf(deployerAccount);
    assert.strictEqual(deployerBalance.toString(), totalSupply.toString(), "付款人的初始余额不等于总供应量");
  });

  it("应该在不同的账户之间转移token", async () => {
    const transferAmount = web3.utils.toBN(1000);
    const instance = await MyToken.deployed();

    const initialDeployerBalance = await instance.balanceOf(deployerAccount);
    const initialRecipientBalance = await instance.balanceOf(recipientAccount);

    console.log(`初始付款人余额：${initialDeployerBalance.toString()}`);
    console.log(`初始收款人余额：${initialRecipientBalance.toString()}`);

    await instance.transfer(recipientAccount, transferAmount, { from: deployerAccount });

    const finalDeployerBalance = await instance.balanceOf(deployerAccount);
    const finalRecipientBalance = await instance.balanceOf(recipientAccount);

    console.log(`最终付款人余额：${finalDeployerBalance.toString()}`);
    console.log(`最终收款人余额：${finalRecipientBalance.toString()}`);

    assert.strictEqual(initialDeployerBalance.sub(finalDeployerBalance).toString(), transferAmount.toString(), "不正确的金额从部署人员余额中扣除");
    assert.strictEqual(finalRecipientBalance.sub(initialRecipientBalance).toString(), transferAmount.toString(), "不正确的金额添加到收款人的余额中");
  });

  it("应该批准代币进行委托转账", async () => {
    const instance = await MyToken.deployed();
    const approvalAmount = web3.utils.toBN(1000);

    await instance.approve(anotherAccount, approvalAmount, { from: deployerAccount });
    const allowance = await instance.allowance(deployerAccount, anotherAccount);
    assert.strictEqual(allowance.toString(), approvalAmount.toString(), "限额是不正确的");
  });

  it("应该处理委托的令牌传输", async () => {
    const instance = await MyToken.deployed();
    const transferAmount = web3.utils.toBN(1000);
    const approvalAmount = web3.utils.toBN(2000);

    await instance.approve(anotherAccount, approvalAmount, { from: deployerAccount });

    const initialRecipientBalance = await instance.balanceOf(recipientAccount);

    console.log(`转移前的收款人余额：${initialRecipientBalance.toString()}`);

    await truffleAssert.passes(instance.transferFrom(deployerAccount, recipientAccount, transferAmount, { from: anotherAccount }));

    const finalRecipientBalance = await instance.balanceOf(recipientAccount);
    const remainingAllowance = await instance.allowance(deployerAccount, anotherAccount);

    console.log(`转移后的收款人余额：${finalRecipientBalance.toString()}`);
    console.log(`转移后的限额：${remainingAllowance.toString()}`);

    assert.strictEqual(finalRecipientBalance.sub(initialRecipientBalance).toString(), transferAmount.toString(), "收款人没有收到预期金额");
    assert.strictEqual(remainingAllowance.toString(), approvalAmount.sub(transferAmount).toString(), "转账后限额不正确");
  });
});
