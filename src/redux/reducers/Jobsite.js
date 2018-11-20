import { FileSystem } from 'expo';

const defaultState = {
	abrasive: 0,
	crsf_auto: 0,
	dry_joints_left: null,
	dry_joints_left_comment: '',
	dry_joints_left_image: '',
	dry_joints_right: null,
	dry_joints_right_image: '',
	dry_joints_right_comment: '',
	ext_cannon_left: null,
	ext_cannon_left_comment: '',
	ext_cannon_left_image: '',
	ext_cannon_right: null,
	ext_cannon_right_comment: '',
	ext_cannon_right_image: '',
	id: 0,
	impact: 0,
	inspection_date: '',
	inspection_id: 0,
	inspector_note: '',
	jobsite: '',
	jobsite_note: '',
	moisture: 0,
	packing: 0,
	scallop_left: null,
	scallop_left_comment: '',
	scallop_left_image: '',
	scallop_right: null,
	scallop_right_comment: '',
	scallop_right_image: '',
	track_sag_left: null,
	track_sag_left_comment: '',
	track_sag_left_image: '',
	track_sag_right: null,
	track_sag_right_comment: '',
	track_sag_right_image: '',
	uom: 0,
};

export default function reducer(state = defaultState, action) {
	let newState = {};
	switch (action.type) {
	case 'GET_JOBSITE_DETAIL':
		return action.value;
	case 'RESET_JOBSITE_DETAIL':
		return defaultState;
	case 'UPDATE_IMPACT':
		return {
			...state,
			impact: action.value,
		};
	case 'UPDATE_ABRASIVE':
		return {
			...state,
			abrasive: action.value,
		};
	case 'UPDATE_MOISTURE':
		return {
			...state,
			moisture: action.value,
		};
	case 'UPDATE_PACKING':
		return {
			...state,
			packing: action.value,
		};
	case 'UPDATE_MEASURE':
		return {
			...state,
			uom: action.value,
		};
	case 'UPDATE_LEFT_TRACK_SAG':
		return {
			...state,
			track_sag_left: action.value.input,
			// track_sag_left_comment: action.value.photoComment,
			// track_sag_left_image: action.value.photoPath,
		};
	case 'UPDATE_RIGHT_TRACK_SAG':
		return {
			...state,
			track_sag_right: action.value.input,
			// track_sag_right_comment: action.value.photoComment,
			// track_sag_right_image: action.value.photoPath,
		};
	case 'UPDATE_LEFT_DRY_JOINTS':
		return {
			...state,
			dry_joints_left: action.value.input,
			// dry_joints_left_comment: action.value.photoComment,
			// dry_joints_left_image: action.value.photoPath,
		};
	case 'UPDATE_RIGHT_DRY_JOINTS':
		return {
			...state,
			dry_joints_right: action.value.input,
			// dry_joints_right_comment: action.value.photoComment,
			// dry_joints_right_image: action.value.photoPath,
		};
	case 'UPDATE_LEFT_CANNON':
		return {
			...state,
			ext_cannon_left: action.value.input,
			// ext_cannon_left_comment: action.value.photoComment,
			// ext_cannon_left_image: action.value.photoPath,
		};
	case 'UPDATE_RIGHT_CANNON':
		return {
			...state,
			ext_cannon_right: action.value.input,
			// ext_cannon_right_comment: action.value.photoComment,
			// ext_cannon_right_image: action.value.photoPath,
		};
	case 'UPDATE_LEFT_SCALLOP':
		return {
			...state,
			scallop_left: action.value.input,
			// scallop_left_comment: action.value.photoComment,
			// scallop_left_image: action.value.photoPath,
		};
	case 'UPDATE_RIGHT_SCALLOP':
		return {
			...state,
			scallop_right: action.value.input,
			// scallop_right_comment: action.value.photoComment,
			// scallop_right_image: action.value.photoPath,
		};
	case 'UPDATE_INSPECTION_COMMENT':
		return {
			...state,
			inspector_note: action.value,
		};
	case 'UPDATE_JOBSITE_COMMENT':
		return {
			...state,
			jobsite_note: action.value,
		};
	case 'SAVE_PHOTO':
		switch (action.value.type) {
		case 'left_track_sag':
			newState = {
				...state,
				track_sag_left_comment: action.value.comment,
				track_sag_left_image: action.value.path,
			};
			break;
		case 'right_track_sag':
			newState = {
				...state,
				track_sag_right_comment: action.value.comment,
				track_sag_right_image: action.value.path,
			};
			break;
		case 'left_cannon':
			newState = {
				...state,
				ext_cannon_left_comment: action.value.comment,
				ext_cannon_left_image: action.value.path,
			};
			break;
		case 'right_cannon':
			newState = {
				...state,
				ext_cannon_right_comment: action.value.comment,
				ext_cannon_right_image: action.value.path,
			};
			break;
		case 'left_dry_joints':
			newState = {
				...state,
				dry_joints_left_comment: action.value.comment,
				dry_joints_left_image: action.value.path,
			};
			break;
		case 'right_dry_joints':
			newState = {
				...state,
				dry_joints_right_comment: action.value.comment,
				dry_joints_right_image: action.value.path,
			};
			break;
		case 'left_scallop_measurement':
			newState = {
				...state,
				scallop_left_comment: action.value.comment,
				scallop_left_image: action.value.path,
			};
			break;
		case 'right_scallop_measurement':
			newState = {
				...state,
				scallop_right_comment: action.value.comment,
				scallop_right_image: action.value.path,
			};
			break;
		default:
			newState = {
				...state,
			};
			break;
		}

		// Update redux
		return newState;

	case 'REMOVE_PHOTO':
		// Remove from Redux
		switch (action.photoType) {
		case 'left_track_sag':
			FileSystem.deleteAsync(state.track_sag_left_image)
				.then(() => {})
				.catch(() => {});
			newState = {
				...state,
				track_sag_left_comment: null,
				track_sag_left_image: null,
			};
			break;
		case 'right_track_sag':
			FileSystem.deleteAsync(state.track_sag_right_image)
				.then(() => {})
				.catch(() => {});
			newState = {
				...state,
				track_sag_right_comment: null,
				track_sag_right_image: null,
			};
			break;
		case 'left_cannon':
			FileSystem.deleteAsync(state.ext_cannon_left_image)
				.then(() => {})
				.catch(() => {});
			newState = {
				...state,
				ext_cannon_left_comment: null,
				ext_cannon_left_image: null,
			};
			break;
		case 'right_cannon':
			FileSystem.deleteAsync(state.ext_cannon_right_image)
				.then(() => {})
				.catch(() => {});
			newState = {
				...state,
				ext_cannon_right_comment: null,
				ext_cannon_right_image: null,
			};
			break;
		default:
			newState = {
				...state,
			};
			break;
		}
		return newState;
	default:
		return state;
	}
}
