import { FileSystem, SQLite } from 'expo';

const defaultState = {
	isFetching: false,
	componentList: [],
	selectedComponent: null,
	selectedTestPoint: {},
	dealershipLimits: {},
	localToolImg: '',
};

export default function reducer(state = defaultState, action) {
	// //////////////
	// FETCH DATA
	if (action.type === 'SELECT_COMPONENT_LIST') {
		return {
			...state,
			isFetching: true,
			componentList: [],
		};
	} if (action.type === 'FETCHING_COMPONENT_SUCCESS') {
		return {
			...state,
			isFetching: false,
			componentList: action.data,
		};
	}
	if (action.type === 'CHANGES_COMPONENT_LIST') {
		const newList = action.oldComponentList.map((item) => {
			if (item.equnit_auto === action.selected.equnit_auto) {
				return action.selected;
			}
			return item;
		});
		return {
			...state,
			componentList: newList,
		};
	}
	if (action.type === 'SELECT_COMPONENT') {
		return {
			...state,
			selectedComponent: action.data,
		};
	} if (action.type === 'SELECT_COMPONENT_TOOL') {
		return {
			...state,
			selectedComponent: {
				...state.selectedComponent,
				tool: action.data,
			},
		};
	} if (action.type === 'SELECT_TEST_POINT') {
		return {
			...state,
			selectedTestPoint: action.data,
			localToolImg: '',
		};
	} if (action.type === 'SELECT_LOCAL_TOOL_IMAGE') {
		return {
			...state,
			selectedTestPoint: {},
			localToolImg: action.data,
		};
	} if (action.type === 'UPDATE_INSPECTION_COMMENT') {
		return {
			...state,
			selectedComponent: {
				...state.selectedComponent,
				comments: action.data,
			},
		};
	} if (action.type === 'UPDATE_INSPECTION_READING') {
		return {
			...state,
			selectedComponent: {
				...state.selectedComponent,
				reading: action.reading,
				worn_percentage: action.worn,
			},
		};
	} if (action.type === 'SELECT_DEALERSHIP_LIMITS') {
		return {
			...state,
			dealershipLimits: action.data,
		};
	} if (action.type === 'SAVE_COMPONENT_PHOTO') {
		return {
			...state,
			selectedComponent: {
				...state.selectedComponent,
				inspection_image: action.data,
			},
		};
	} if (action.type === 'REMOVE_COMPONENT_PHOTO') {
		FileSystem.deleteAsync(state.selectedComponent.inspection_image)
			.then((response) => {}).catch((error) => {});
		return {
			...state,
			selectedComponent: {
				...state.selectedComponent,
				inspection_image: null,
			},
		};
	} if (action.type === 'ADD_RECOMMENDATIONS') {
		const newList = state.componentList.map((item) => {
			if (item.equnit_auto === action.equnit) {
				item.recommendation_comment = action.data.comment;
        item.recommendation_id = action.data.recId;
        item.reading = action.selected.reading;
        item.worn_percentage = action.selected.worn_percentage;
        item.comments = action.selected.comments;
        item.inspection_image = action.selected.inspection_image;
			}
			return item;
		});
		const selectedOne = newList.filter(item => item.equnit_auto === action.equnit);
		return {
			...state,
			componentList: newList,
			selectedComponent: selectedOne[0],
		};
	}
	return state;
}
