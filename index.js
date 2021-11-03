const VM = require('@ethereumjs/vm').default
const Common = require('@ethereumjs/common').default
const Chain = require('@ethereumjs/common').Chain

let vm = null
const common = new Common({ chain: Chain.Mainnet })
const output = document.getElementById('opcodes')
const error = document.getElementById('error')

function getCodes() {
  vm = new VM({ common })
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
  common.setChain(select.value.toLowerCase())
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
  common.setChain(select.target.value.toLowerCase())
  listHardForks()
}

function onHardForkChange(select) {
  common.setHardfork(select.target.value)
  getCodes()
}

listChains()
document.getElementById('hardforks').addEventListener('input', onHardForkChange)
document.getElementById('chains').addEventListener('input', onChainChange)
