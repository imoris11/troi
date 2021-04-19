import { Layout } from './Layout'
import { StateProvider } from './store';

function App() {
  return (
    <div className="App">
      <StateProvider>
        <Layout />
      </StateProvider>
    </div>
  )
}

export default App;
