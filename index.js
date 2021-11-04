const VM = require('@ethereumjs/vm').default
const Common = require('@ethereumjs/common').default
const Chain = require('@ethereumjs/common').Chain

let common = null
let vm = null

const output = document.getElementById('opcodes')
const error = document.getElementById('error')

function initVm(chainId) {
  console.log("Initializing new VM with chain: ", chainId)
  common = new Common({ chain: chainId || Chain.Mainnet })
  vm = new VM({ common })
}

function getCodes(chainId) {
  output.innerHTML = ''
  vm.getActiveOpcodes().forEach((value) => {
    output.innerHTML += value.code + ':' + value.fullName + "<br/>"
  })
}

function listChains() {
  const select = document.getElementById('chains')
  select.innerHTML = ''
  for (const item in Chain) {
    if (isNaN(Number(item))) {
      select.add(new Option(item))
    }
  }
  getCodes()
}

function onChainChange(select) {
  initVm(select.target.value.toLowerCase())
  listHardForks()
}

initVm()
listChains()
document.getElementById('chains').addEventListener('input', onChainChange)
