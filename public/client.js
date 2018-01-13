const notes = require('./lib/notes');

const search = {
	template: `
		<input type="text" placeholder=".." autocomplete="on" @keyup="doSearch"/>
	`,
	methods: {
		doSearch: function(e) {
			const str = e.target.value;
			if (!str) {
				this.$emit('resetQuery');
			}
			if (str && e.key != 'Enter') {
				this.$emit('doSearch', str);
			} else {
				// handle create note
			}
		}
	}
};

const list = {
	props: ['notes'],
	template: `
		<div id="list">
			<input v-for="note in notes" :value="note.title" type="text" @keyup.enter="openNote"/>
		</div>
	`,
	methods: {
		openNote: function(e) {
			this.$emit('openNote', e.target.value);
		}
	}
};

const note = {
	props: ['selectedNote'],
	template: `
		<div>
			<textarea>{{ selectedNote }}</textarea>
		</div>
	`
};

const app = new Vue({
  el: '#app',
  template: `<div>
		<p class="header">nvjs {{ status }}</p>
		<search @doSearch="doSearch" @resetQuery="resetQuery"></search>
		<list @openNote="openNote" :notes="query"></list>
		<note :selectedNote="selectedNote"></note>
  </div>`,
  components: { search, list, note },
  data: () => {
    return {
      status: '',
      notes: [],
			selectedNote: '',
			query: []
    }
  },
  methods: {
		doSearch: function(str) {
			const re = new RegExp(str, 'i');
			this.query = this.notes.filter(note => re.test(note.title));
			this.selectedNote = '';
		},
		resetQuery: function() {
			this.query = [];
		},
		openNote: function(title) {
			this.selectedNote = this.query.filter(note => note.title === title)[0].body;
			// set prompt/focus
		}
	},
  created: function() {
		notes.read()
			.then(data => this.notes = data);
  }
});
