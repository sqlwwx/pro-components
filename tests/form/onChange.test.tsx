import React from 'react';
import { Input } from 'antd';
import ProForm, { ProFormField } from '@ant-design/pro-form';
import { act } from 'react-dom/test-utils';

import { mount } from 'enzyme';
import { waitForComponentToPaint } from '../util';

describe('ProForm', () => {
  it('📦 ProFormField Component support onChange', async () => {
    const onFinish = jest.fn();
    const onChange = jest.fn();
    const wrapper = mount(
      <ProForm
        onValuesChange={async (values) => {
          onFinish(values?.name);
        }}
      >
        <ProFormField name="name">
          <Input
            id="name"
            onChange={(evt) => {
              onChange(evt?.target?.value);
            }}
          />
        </ProFormField>
      </ProForm>,
    );

    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('Input#name').simulate('change', {
        target: {
          value: 'test',
        },
      });
    });

    await waitForComponentToPaint(wrapper, 100);

    expect(onChange).toBeCalledWith('test');
    expect(onFinish).toBeCalledWith('test');
  });
});
