import { renderHook } from '@testing-library/react-hooks';
import { dataExampleSpecs } from '../../example/src/data';
import BarChart from '.';

const { result } = renderHook(() => BarChart({...dataExampleSpecs.appComponentStates.barChart}));


describe('BarChart Component', () => {

  const height = result.current.props.children.props.height;
  const width = result.current.props.children.props.width;

  it('should exist', () => {
    expect(result);
  });

  it('should be type SVG', () => {
    expect(result.current.props.children.type).toEqual('svg');
  });

  it(`should be ${height} high`, () => {
    expect(height).toEqual(dataExampleSpecs.appComponentStates.barChart.height);
  });

  it(`should be ${width} wide`, () => {
    expect(width).toEqual(dataExampleSpecs.appComponentStates.barChart.width);
  });

});
