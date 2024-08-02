import { Provider } from 'react-redux'
import TabsNavigator from '../../src/navigators/TabsNavigator'
import store from '../../src/features/auth/redux/store'

export default function TabsLayout() {
	return (
		<Provider store={store}>
			<TabsNavigator />
		</Provider>
	)
}
