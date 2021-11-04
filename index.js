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
  listHardForks()
}

function listHardForks() {
  const select = document.getElementById('hardforks')
  select.innerHTML = ''
  common.hardforks().forEach((value) => {
    select.add(new Option(value.name))
  })
  common.setHardfork(select.value)
  getCodes()
}

function onChainChange(select) {
  initVm(select.target.value.toLowerCase())
  listHardForks()
}

function onHardForkChange(select) {
  common.setHardfork(select.target.value)
  getCodes()
}

initVm()
listChains()
document.getElementById('hardforks').addEventListener('input', onHardForkChange)
document.getElementById('chains').addEventListener('input', onChainChange)
