import UCInspectionManager from '../../business/UCInspectionManager';

export const getComponentList = () => ({
	type: 'SELECT_COMPONENT_LIST',
});

export const getComponentListSuccess = data => ({
	type: 'FETCHING_COMPONENT_SUCCESS',
	data,
});

export const fetchComponentList = inspectionId => (dispatch) => {
	dispatch(getComponentList());
	UCInspectionManager.getComponentList(inspectionId)
		.then((response) => {
			dispatch(getComponentListSuccess(response));
		})
		.catch(err => console.log('err:', err));
};

export const selectComponent = item => ({
	type: 'SELECT_COMPONENT',
	data: item,
});

export const selectTool = tool => ({
	type: 'SELECT_COMPONENT_TOOL',
	data: tool,
});

export const updateComment = comment => ({
	type: 'UPDATE_INSPECTION_COMMENT',
	data: comment,
});

export const updateReading = (reading, worn) => ({
	type: 'UPDATE_INSPECTION_READING',
	reading,
	worn,
});

export const getTestPoint = value => ({
	type: 'SELECT_TEST_POINT',
	data: value,
});

export const getLocalToolImg = value => ({
	type: 'SELECT_LOCAL_TOOL_IMAGE',
	data: value,
});

export const getDealershipLimits = value => ({
	type: 'SELECT_DEALERSHIP_LIMITS',
	data: value,
});

export const savePhoto = photoPath => ({
	type: 'SAVE_COMPONENT_PHOTO',
	data: photoPath,
});

export const removePhoto = () => ({
	type: 'REMOVE_COMPONENT_PHOTO',
});

export const changesComponentList = (oldComponentList, selected) => ({
  type: 'CHANGES_COMPONENT_LIST',
  oldComponentList,
  selected
});

export const addRecommondsSave = (equnitAuto, objValue, selected) => ({
	type: 'ADD_RECOMMENDATIONS',
	data: objValue,
  equnit: equnitAuto,
  selected
});
