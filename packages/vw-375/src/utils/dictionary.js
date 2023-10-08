export const gradeName = gradeId => {
  const data = {
    1007: '初一',
    1008: '初二',
    1009: '初三',
    1010: '高一',
    1011: '高二',
    1012: '高三'
  };
  return data?.[gradeId] || '';
};

export const termName = termId => {
  return ['总复习', '上学期', '下学期'][termId];
};
