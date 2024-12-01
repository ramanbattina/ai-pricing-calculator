import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { CpuChipIcon, CurrencyDollarIcon, ClockIcon } from '@heroicons/react/24/outline'

const providers = [
  {
    name: 'OpenAI',
    models: [
      { name: 'GPT-4 Turbo', inputPrice: 0.01, outputPrice: 0.03, context: '128K tokens' },
      { name: 'GPT-4', inputPrice: 0.03, outputPrice: 0.06, context: '8K tokens' },
      { name: 'GPT-3.5 Turbo', inputPrice: 0.0005, outputPrice: 0.0015, context: '16K tokens' }
    ]
  },
  {
    name: 'Anthropic',
    models: [
      { name: 'Claude 2.1', inputPrice: 0.008, outputPrice: 0.024, context: '100K tokens' },
      { name: 'Claude Instant', inputPrice: 0.0008, outputPrice: 0.0024, context: '100K tokens' }
    ]
  },
  {
    name: 'Mistral AI',
    models: [
      { name: 'Mistral Large', inputPrice: 0.008, outputPrice: 0.024, context: '32K tokens' },
      { name: 'Mistral Medium', inputPrice: 0.002, outputPrice: 0.006, context: '32K tokens' },
      { name: 'Mistral Small', inputPrice: 0.0002, outputPrice: 0.0006, context: '32K tokens' }
    ]
  }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function App() {
  const [inputTokens, setInputTokens] = useState(1000)
  const [outputTokens, setOutputTokens] = useState(500)
  const [selectedProvider, setSelectedProvider] = useState(providers[0])

  const calculateCost = (model) => {
    const inputCost = (inputTokens / 1000) * model.inputPrice
    const outputCost = (outputTokens / 1000) * model.outputPrice
    return (inputCost + outputCost).toFixed(4)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-6">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            AI Model Pricing Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Compare costs across different AI model providers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Input Parameters + Provider Selection */}
          <div className="space-y-6">
            {/* Input Parameters */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CpuChipIcon className="h-6 w-6 text-primary-500" />
                Input Parameters
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Input Tokens
                  </label>
                  <input
                    type="number"
                    value={inputTokens}
                    onChange={(e) => setInputTokens(Number(e.target.value))}
                    className="input"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Output Tokens
                  </label>
                  <input
                    type="number"
                    value={outputTokens}
                    onChange={(e) => setOutputTokens(Number(e.target.value))}
                    className="input"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Provider Selection */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CurrencyDollarIcon className="h-6 w-6 text-primary-500" />
                Provider Selection
              </h2>
              <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-primary-100 p-1">
                  {providers.map((provider) => (
                    <Tab
                      key={provider.name}
                      className={({ selected }) =>
                        classNames(
                          'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                          'ring-white ring-opacity-60 ring-offset-2 ring-offset-primary-400 focus:outline-none focus:ring-2',
                          selected
                            ? 'bg-white shadow text-primary-700'
                            : 'text-primary-600 hover:bg-white/[0.12] hover:text-primary-700'
                        )
                      }
                      onClick={() => setSelectedProvider(provider)}
                    >
                      {provider.name}
                    </Tab>
                  ))}
                </Tab.List>
              </Tab.Group>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="card h-fit">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ClockIcon className="h-6 w-6 text-primary-500" />
              Cost Estimation
            </h2>
            <div className="space-y-4">
              {selectedProvider.models.map((model) => (
                <div
                  key={model.name}
                  className="p-4 rounded-lg border border-gray-200 hover:border-primary-500 transition-colors duration-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">{model.name}</h3>
                    <span className="text-sm text-gray-500">{model.context}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Input: ${model.inputPrice}/1K tokens
                      <br />
                      Output: ${model.outputPrice}/1K tokens
                    </div>
                    <div className="text-lg font-semibold text-primary-600">
                      ${calculateCost(model)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
