import SQLiteManager from '../../database/SQLiteManager';
import UCMainManager from '../../business/UCMainManager';
// import { stat } from 'fs';

const defaultState = {

	// Get unsynced inspections
	dataFetched: false,
	isFetching: false,
	unsyncedList: [],

	// Select/ deselect items
	selectedList: [],

	// Current inspection
	currentInspection: {},
};

export default function reducer(state = defaultState, action) {
	// //////////////
	// FETCH DATA
	if (action.type === 'SELECT_UNSYNCED_LIST') {
		return {
			...state,
			isFetching: true,
			unsyncedList: [],
			selectedList: [],
			currentInspection: {},
		};
	}
	if (action.type === 'FETCHING_DATA_SUCCESS') {
		return {
			...state,
			isFetching: false,
			unsyncedList: action.data,
		};

		// //////////////////////////
		// SELECT/ DESELECT DATA
	}
	if (action.type === 'SELECT_DESELECT_FROM_LIST') {
		let newSelected = [];
		newSelected = newSelected.concat(state.selectedList);
		if (newSelected.includes(action.inspectionId)) {
			newSelected.forEach((element, index) => {
				if (element === action.inspectionId) {
					newSelected.splice(index, 1);
				}
			});
		} else {
			newSelected.push(action.inspectionId);
		}

		return {
			...state,
			selectedList: newSelected,
		};
	}
	if (action.type === 'UPDATE_EQUIPMENT_IMAGE') {
		return {
			...state,
			currentInspection: {
				...state.currentInspection,
				image: action.data,
			},
		};
  }
  // //////////////////////////
		// PRESS REMOVE
	if (action.type === 'PRESS_REMOVE') {
		let inspectionIds = state.selectedList.join(',');
		inspectionIds = `(${  inspectionIds  })`;
		SQLiteManager.deleteInspections(inspectionIds);

		return {
			...state,
			selectedList: [],
		};
	}
	if (action.type === 'SELECT_CURRENT_INSPECTION') {
		return {
			...state,
			currentInspection: action.equipment,
		};
  }
  if(action.type === 'EQUIPMENT_PHOTO') {
    console.log(state);
    return {
      ...state,
      currentInspection: { ...state.currentInspection, image: action.filePath },
    };
  }
	return state;
}
