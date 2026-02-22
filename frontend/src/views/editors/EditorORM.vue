<template>
  <div class="editor-content">
    <div class="editor-header">
      <h4>
        This is an editor to create Object-Role-Modelling (ORM) schemas, powered by
        <a href="https://github.com/bpmn-io/diagram-js/tree/develop" target="_blank">
          diagram-js
        </a>.
      </h4>
      <p>
        For more information on the formalism and its structure see:
        <a href="/docs/editors/ts/Adam_Banham___ORMs.pdf" target="_blank">A Brief Introduction to ORM and Conceptual
          Modelling</a>.
      </p>
      <p>
        Notably, the editor is still a bit fragile and can crash.
        But, there is a more actively developed version of the editor
        available for vs-code:
        <a href="https://marketplace.visualstudio.com/items?itemName=qORMa.qorma" target="_blank">
          qORMa
        </a>
      </p>
    </div>
    <div ref="container" class="editor-container editor-orm-container editor-canvas editor-outter-box-shadow"
      id="content">
      <div ref="canvas" class="editor" id="orm-editor">
        <!-- The editor will be rendered here -->

        <div class="helpers">
          <div id="help-interactions" class="djs-palette djs-parent help-interactions close">
            <div class="content" />
          </div>
          <div id="help-interactions-error"
            class="djs-palette djs-parent help-interactions help-interactions-error close">
            <div class="content" />
          </div>
          <div class="keyboard" id="keyboard-window">
            <div class="content">
              <h2 style="text-align: center;">
                Keyboard Controls
              </h2>
              <h3> Creation Controls</h3>
              <div class="keys">
                <div class="entry mdi mdi-square-rounded">
                  <span class="mdi">
                    <strong>alt</strong>
                  </span>
                  <span class="mdi mdi-plus" />
                  <span class="mdi mdi-alpha-e-box-outline" />
                  <span class="mdi mdi-arrow-right-thin" />
                  <span>Create a new entity</span>
                </div>
                <div class="entry mdi mdi-square-rounded">
                  <span class="mdi">
                    <strong>alt</strong>
                  </span>
                  <span class="mdi mdi-plus" />
                  <span class="mdi mdi-alpha-v-box-outline" />
                  <span class="mdi mdi-arrow-right-thin" />
                  <span>Create a new value entity</span>
                </div>
                <div class="entry mdi mdi-square-rounded">
                  <span class="mdi">
                    <strong>alt</strong>
                  </span>
                  <span class="mdi mdi-plus" />
                  <span class="mdi mdi-alpha-f-box-outline" />
                  <span class="mdi mdi-arrow-right-thin" />
                  <span>Create a new fact relation</span>
                </div>
                <div class="entry mdi mdi-square-rounded">
                  <span class="mdi">
                    <strong>alt</strong>
                  </span>
                  <span class="mdi mdi-plus" />
                  <span class="mdi mdi-alpha-a-box-outline" />
                  <span class="mdi mdi-arrow-right-thin" />
                  <span>Use Lasso (<span class="mdi mdi-lasso" />) tool</span>
                </div>
                <div class="entry mdi mdi-square-rounded">
                  <span class="mdi">
                    <strong>alt</strong>
                  </span>
                  <span class="mdi mdi-plus" />
                  <span class="mdi mdi-alpha-s-box-outline" />
                  <span class="mdi mdi-arrow-right-thin" />
                  <span>Use Space (<span class="mdi mdi-cursor-move" />) tool</span>
                </div>
                <div class="entry mdi mdi-square-rounded">
                  <span class="mdi">
                    <strong>crtl</strong>
                  </span>
                  <span class="mdi mdi-plus" />
                  <span class="mdi mdi-alpha-k-box-outline" />
                  <span class="mdi mdi-arrow-right-thin" />
                  <span>Toggle keyboard help menu</span>
                </div>
                <div class="entry mdi mdi-square-rounded">
                  <span class="mdi">
                    <strong>Tab</strong>
                  </span>
                  <span class="mdi mdi-arrow-right-thin" />
                  <span>Toggle selection between shapes</span>
                </div>
                <div class="entry mdi mdi-square-rounded">
                  <span class="mdi">
                    <strong>crtl</strong>
                  </span>
                  <span class="mdi mdi-plus" />
                  <span class="mdi">
                    <strong>shift</strong>
                  </span>
                  <span class="mdi mdi-plus" />
                  <span class="mdi mdi-alpha-o-box-outline" />
                  <span class="mdi mdi-arrow-right-thin" />
                  <span>Toggle symbol searching within ORM schema</span>
                </div>
                <div class="entry mdi mdi-square-rounded">
                  <span class="mdi">
                    <strong>alt</strong>
                  </span>
                  <span class="mdi mdi-plus" />
                  <span class="mdi mdi-arrow-left-bold-box-outline" />
                  <span class="mdi mdi-arrow-right-thin" />
                  <span>Step back in selection history</span>
                </div>
                <div class="entry mdi mdi-square-rounded">
                  <span class="mdi">
                    <strong>alt</strong>
                  </span>
                  <span class="mdi mdi-plus" />
                  <span class="mdi mdi-arrow-right-bold-box-outline" />
                  <span class="mdi mdi-arrow-right-thin" />
                  <span>Step forward in selection history</span>
                </div>
              </div>
              <p>
                When any element is selected, the element can be deleted by
                pressing the <strong>del</strong> key or the
                <span class="mdi mdi-delete" /> icon.
              </p>
              <h3> Enities / Value Entities</h3>
              <p> When an entity or value entity is selected the following keyboard
                shortcuts are available:
              </p>
              <div class="keys">
                <div class="entry mdi mdi-square-rounded">
                  <span class="mdi mdi-alpha-c-box-outline" />
                  <span class="mdi mdi-arrow-right-thin" />
                  <span>Link entity to fact relation</span>
                </div>
                <div class="entry mdi mdi-square-rounded">
                  <span class="mdi mdi-alpha-s-box-outline" />
                  <span class="mdi mdi-arrow-right-thin" />
                  <span>Make entity a substype of other</span>
                </div>
                <div class="entry mdi mdi-square-rounded">
                  <span class="mdi mdi-alpha-t-box-outline" />
                  <span class="mdi mdi-arrow-right-thin" />
                  <span>Change the type of the entity</span>
                </div>
                <div class="entry mdi mdi-square-rounded">
                  <span class="mdi mdi-alpha-r-box-outline" />
                  <span class="mdi mdi-arrow-right-thin" />
                  <span>Change the reference mode of the entity</span>
                </div>
                <div class="entry mdi mdi-square-rounded">
                  <span class="mdi mdi-alpha-f-box-outline" />
                  <span class="mdi mdi-arrow-right-thin" />
                  <span>Create a connected unary fact relation</span>
                </div>
              </div>
              <h3>Fact Relations</h3>
              <p>
                When an fact relation is selected the following keyboard
                shortcuts are available:
              </p>
              <div class="keys">
                <div class="entry mdi mdi-square-rounded">
                  <span class="mdi mdi-plus-box-outline" />
                  <span class="mdi mdi-arrow-right-thin" />
                  <span>Expand the arity of the fact relation</span>
                </div>
                <div class="entry mdi mdi-square-rounded">
                  <span class="mdi mdi-minus-box-outline" />
                  <span class="mdi mdi-arrow-right-thin" />
                  <span>Reduce the arity of the fact relation</span>
                </div>
                <div class="entry mdi mdi-square-rounded">
                  <span class="mdi mdi-alpha-d-box-outline" />
                  <span class="mdi mdi-arrow-right-thin" />
                  <span>Create/remove derived label</span>
                </div>
                <div class="entry mdi mdi-square-rounded">
                  <span class="mdi mdi-alpha-l-box-outline" />
                  <span class="mdi mdi-arrow-right-thin" />
                  <span>Set direction of verbalisation to the left</span>
                </div>
                <div class="entry mdi mdi-square-rounded">
                  <span class="mdi mdi-alpha-r-box-outline" />
                  <span class="mdi mdi-arrow-right-thin" />
                  <span>Set direction of verbalisation to the right</span>
                </div>
                <div class="entry mdi mdi-square-rounded">
                  <span class="mdi mdi-alpha-n-box-outline" />
                  <span class="mdi mdi-arrow-right-thin" />
                  <span>Remove direction of verbalisation</span>
                </div>
                <div class="entry mdi mdi-square-rounded">
                  <span class="mdi mdi-alpha-c-box-outline" />
                  <span class="mdi mdi-arrow-right-thin" />
                  <span>Create uniqueness constraint</span>
                </div>
                <div class="entry mdi mdi-square-rounded">
                  <span class="mdi mdi-alpha-o-box-outline" />
                  <span class="mdi mdi-arrow-right-thin" />
                  <span>Make/remove objectification of relation</span>
                </div>
              </div>
            </div>
          </div>
          <div class="djs-parent djs-palette open keyboard-palette">
            <div class="djs-palette-entries">
              <div class="group">
                <div class="entry mdi mdi-keyboard" id="keyboard-controls-icon">
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import EditorORM from "./ORM/editor"

export default {
  name: "EditorORM",
  data() {
    return {
      root: null,
      container: null,
      editor: null
    }
  },
  methods: {
    toggleFullscreen: function () {
      this.container.classList.toggle("fullscreen");
      setTimeout(
        () => this.editor.get('canvas').zoom('fit-viewport'),
        50
      );
    },
  },
  mounted: function () {
    this.root = this.$refs.canvas;
    this.container = this.$refs.container;
    this.editor = new EditorORM(
      this.root
    );

    var that = this;
    this.editor.invoke(['eventBus', function (bus) {
      bus.on(
        'editor.fullscreen.toggle',
        50, (ev) => {
          that.toggleFullscreen()
        }, that)
    }]);
  }
}
</script>

<style lang="css">
@import "./ORM/media/editor.css";
@import "./ORM/media/render.css";
</style>