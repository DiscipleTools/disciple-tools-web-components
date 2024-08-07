import { useState } from 'react';
import './App.css';
import '@disciple.tools/web-components';
import { wrapWc } from 'wc-react';

const DtTile = wrapWc('dt-tile');
const DtText = wrapWc('dt-text');
const DtTextArea = wrapWc('dt-textarea');
const DtNumber = wrapWc('dt-number');
const DtDate = wrapWc('dt-date');
const DtSingleSelect = wrapWc('dt-single-select');
const DtMultiSelect = wrapWc('dt-multi-select');
const DtTags = wrapWc('dt-tags');
const DtConnection = wrapWc('dt-connection');
const DtUsersConnection = wrapWc('dt-users-connection');
const DtDropdown = wrapWc('dt-dropdown');

function App() {
  const [output, setOutput] = useState();
  const values = {
    textField: useState(),
    textareaField: useState(),
    numberField: useState(),
    dateField: useState(),
    singleSelectField: useState('opt1'),
    multiSelectField: useState(),
    tagsField: useState([{id:'personal',label:'Personal'}]),
    connectionsField: useState(),
  };

  const handleChange = (e) => {
    console.log(e);
    const detail = e?.detail || {};
    if (values[detail.field]) {
      values[detail.field][1](detail.newValue);
    }
    setOutput(
      JSON.stringify(e?.detail, null, 2)
    );
  }


  const options = [{
    id: 'opt1', label: 'Option 1',
  }, {
    id: 'opt2', label: 'Option 2',
  }, {
    id: 'opt3', label: 'Option 3',
  }, {
    id: 'opt4', label: 'Option 4',
  }, {
    id: 'opt5', label: 'Option 5',
  }];
  const tags = [{
    id: 'personal', label: 'Personal',
  }, {
    id: 'web', label: 'Web',
  }, {
    id: 'facebook', label: 'Facebook',
  }];
  const posts = [{
    id: '1', label: 'John Doe',
  }, {
    id: '2', label: 'Jane Smith', user: true,
  }, {
    id: '3', label: 'Trevor Virtue', user: true,
  }, {
    id: '4', label: 'Jane Meldrum',
  }];

  return (
    <div className="App">
      <DtTile title="Kitchen Sink Tile" expands>
        <DtText name='textField' label="Text Field" value={values.textField[0]} change={handleChange} />

        <DtTextArea name='textareaField' label="Textarea Field" value={values.textareaField[0]} change={handleChange}></DtTextArea>

        <DtNumber name="numberField" label="Number Field" value={values.numberField[0]} change={handleChange}></DtNumber>

        <DtDate name="dateField" label="Date Field" value={values.dateField[0]} change={handleChange}></DtDate>

        <DtSingleSelect
          name="singleSelectField"
          label="Single Select Field"
          placeholder="Select Item"
          value={values.singleSelectField[0]}
          options={options}
          change={handleChange}
        ></DtSingleSelect>

        <DtMultiSelect
          name="multiSelectField"
          label="Multi Select Field"
          placeholder="Select Items"
          value={values.multiSelectField[0]}
          options={options}
          change={handleChange}
        ></DtMultiSelect>
        <DtDtropdown text="Vijender">

        </DtDtropdown>

        <DtTags
          name="tagsField"
          label="Tags Field"
          value={values.tagsField[0]}
          options={tags}
          change={handleChange}
        ></DtTags>

        <DtConnection
          name="connectionsField"
          label="Connection Field"
          options={posts}
          change={handleChange}
        ></DtConnection>

        <DtUsersConnection
          name="connectionsField"
          label="Connection Field"
          options={posts}
          change={handleChange}
        ></DtUsersConnection>

        <DtDropdown
          name="connectionsField"
          label="Connection Field"
          options={posts}
          change={handleChange}
        ></DtDropdown>

      </DtTile>

      <pre>
        <code>Event:
          {output}
{`

Values: ${JSON.stringify(values, null, 2)}
`}
        </code>
      </pre>
    </div>
  );
}

export default App;
