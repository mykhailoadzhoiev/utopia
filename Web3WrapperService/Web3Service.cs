using System.Threading.Tasks;
using Nethereum.Contracts;
using Nethereum.Hex.HexTypes;
using Nethereum.Signer;
using Nethereum.Util;
using Nethereum.Web3;
using Nethereum.Web3.Accounts;
using Nethereum.Web3.Accounts.Managed;

namespace Utopia
{
    public class Web3Service
    {
        private Account _account;
        private Web3 _web3;
        private const double GAS = 0.0002;
        public HexBigInteger AMOUNT = new HexBigInteger(Web3.Convert.ToWei(0.25));

        public void SetupAccount(string accountKey, Chain chain, string infuraUrl)
        {
            _account = new Account(accountKey, chain);
            _web3 = new Web3(_account, infuraUrl);
        }

        public Contract GetContract(string abi, string contractAddress)
        {
            return _web3.Eth.GetContract(abi, contractAddress);
        }

        public async Task<string> SendTransactionAsync(Contract contract, string functionName, string from, params object[] parameters)
        {
            var gas = new HexBigInteger(Web3.Convert.ToWei(GAS, UnitConversion.EthUnit.Gwei));
            var amount = new HexBigInteger(Web3.Convert.ToWei(0.25));
            var function = contract.GetFunction(functionName);

            return await function.SendTransactionAsync(from, gas, amount, parameters);
        }

        public async Task<HexBigInteger> GetAddressBalanceFromContract(Contract contract, string address)
        {
            return await contract.Eth.GetBalance.SendRequestAsync(address);
        }

        public async Task<int> GetTotalSupply(Contract contract, string functionName)
        {
            var fnc = contract.GetFunction(functionName);
            return await fnc.CallAsync<int>();
        }
    }
}