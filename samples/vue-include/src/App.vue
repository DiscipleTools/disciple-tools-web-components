<script setup>
  import '@disciple.tools/web-components'
</script>

<script>
  export default {
    data() {
      return {
        output: null,
        values: {
          singleSelectField: 'opt1',
          multiSelectField: ['opt1', 'opt2'],
          tagsField: [{id:'personal',label:'Personal'}],
        },
        options: [
          {id: 'opt1', label: 'Option 1'},
          {id: 'opt2', label: 'Option 2'},
          {id: 'opt3', label: 'Option 3'},
          {id: 'opt4', label: 'Option 4'},
          {id: 'opt5', label: 'Option 5'},
        ],
        tags: [
          {id: 'personal', label: 'Personal'},
          {id: 'web', label: 'Web'},
          {id: 'facebook', label: 'Facebook'},
        ],
        posts: [
          {id: '1', label: 'John Doe'},
          {id: '2', label: 'Jane Smith', user: true},
          {id: '3', label: 'Trevor Virtue', user: true},
          {id: '4', label: 'Jane Meldrum'},
        ]
      }
    },

    methods: {
      handleChange(e) {
        console.log(e);

        if (e.detail) {
          this.output = JSON.stringify(e.detail, null, 2);

          if (e.detail.field) {
            this.values[e.detail.field] = e.detail.newValue;
          }
        }
      },
    }
  }
</script>
<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
  </header>

  <main>
    <dt-tile title="Kitchen Sink Tile" :expands="true">

      <dt-text
        name='textField'
        label="Text Field"
        :private="true"
        :value="values.textField"
        @change="handleChange"></dt-text>

      <dt-textarea
        name='textareaField'
        label="Textarea Field"
        :value="values.textareaField"
        @change="handleChange"></dt-textarea>

      <dt-number
        name="numberField"
        label="Number Field"
        @change="handleChange"></dt-number>

      <dt-date
        name="dateField"
        label="Date Field"
        @change="handleChange"></dt-date>

      <dt-single-select
        name="singleSelectField"
        label="Single Select Field"
        placeholder="Select Item"
        :value="values.singleSelectField"
        :options="options"
        @change="handleChange"></dt-single-select>


      <dt-multi-select
        name="multiSelectField"
        label="Multi Select Field"
        placeholder="Select Items"
        :value="values.multiSelectField"
        :options="options"
        @change="handleChange"></dt-multi-select>

      <dt-tags
        name="tagsField"
        label="Tags Field"
        :value="values.tagsField"
        :options="tags"
        @change="handleChange"></dt-tags>

      <dt-connection
        name="connectionField"
        label="Connection Field"
        :options="posts"
        @change="handleChange"></dt-connection>
    </dt-tile>

    <dt-tile tile="Values" :expands="true">
      <pre>
        State:
        <code>{{JSON.stringify(this.values, null, 2)}}</code>
      </pre>
      <pre>
        Event:
        <code>{{output}}</code>
      </pre>
    </dt-tile>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

  pre { color: black; }
  code {
    display: block;
    background-color: lightgray;
    color: black;
  }
</style>
