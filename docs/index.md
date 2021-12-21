Typescript framework / [Exports](modules.md)

# Typescript framework

## Table of contents

- [Installation](#installation)
- Modules
  - actions
    - [Action](https://ilyub.github.io/typescript-framework/modules/actions_Action.html) - Action class.
    - [Confirmable](https://ilyub.github.io/typescript-framework/modules/actions_Confirmable.html) - Confirmable action class.
  - decorators
    - [Enumerable](https://ilyub.github.io/typescript-framework/modules/decorators_Enumerable.html) - Enumerable decorator.
    - [MustBeDefined](https://ilyub.github.io/typescript-framework/modules/decorators_MustBeDefined.html) - MustBeDefined decorator.
    - [OwnProperty](https://ilyub.github.io/typescript-framework/modules/decorators_OwnProperty.html) - OwnProperty decorator.
    - errors
      - [MustBeDefinedError](https://ilyub.github.io/typescript-framework/modules/decorators_errors_MustBeDefinedError.html) - MustBeDefinedError class.
  - facade-implementations
    - compare
      - [natural-compare-wrapper](https://ilyub.github.io/typescript-framework/modules/facade_implementations_compare_natural_compare_wrapper.html) - Implements compare facade.
    - datetime
      - [date-fns-wrapper](https://ilyub.github.io/typescript-framework/modules/facade_implementations_datetime_date_fns_wrapper.html) - Implements datetime facade.
    - facebook
      - [Facebook](https://ilyub.github.io/typescript-framework/modules/facade_implementations_facebook_Facebook.html) - Implements facebook facade.
    - google
      - [Google](https://ilyub.github.io/typescript-framework/modules/facade_implementations_google_Google.html) - Implements google facade.
    - handlePromise
      - [promiseHandler](https://ilyub.github.io/typescript-framework/modules/facade_implementations_handlePromise_promiseHandler.html) - Implements handlePromise facade.
    - httpRequest
      - [axios-wrapper](https://ilyub.github.io/typescript-framework/modules/facade_implementations_httpRequest_axios_wrapper.html) - Implements httpRequest facade.
    - inlineSearch
      - [lunr-wrapper](https://ilyub.github.io/typescript-framework/modules/facade_implementations_inlineSearch_lunr_wrapper.html) - Implements inlineSearch facade.
      - [minisearch-wrapper](https://ilyub.github.io/typescript-framework/modules/facade_implementations_inlineSearch_minisearch_wrapper.html) - Implements inlineSearch facade.
    - lang
      - [dictionary](https://ilyub.github.io/typescript-framework/modules/facade_implementations_lang_dictionary.html) - Implements lang facade.
        - [Definition](https://ilyub.github.io/typescript-framework/modules/facade_implementations_lang_dictionary_Definition.html) - Definition class.
        - [Definitions](https://ilyub.github.io/typescript-framework/modules/facade_implementations_lang_dictionary_Definitions.html) -  Definitions class.
        - [Dictionary](https://ilyub.github.io/typescript-framework/modules/facade_implementations_lang_dictionary_Dictionary.html) -  Dictionary class.
        - [types](https://ilyub.github.io/typescript-framework/modules/facade_implementations_lang_dictionary_types.html) - Types.
    - progressReporter
      - [progressBar](https://ilyub.github.io/typescript-framework/modules/facade_implementations_progressReporter_progressBar.html) - Implements progressReporter facade.
    - reactiveStorage
      - [dummyStorage](https://ilyub.github.io/typescript-framework/modules/facade_implementations_reactiveStorage_dummyStorage.html) - Dummy reactiveStorage facade implementation.
    - showAlert
      - [jsAlert](https://ilyub.github.io/typescript-framework/modules/facade_implementations_showAlert_jsAlert.html) - Implements showAlert facade.
    - showConfirm
      - [jsConfirm](https://ilyub.github.io/typescript-framework/modules/facade_implementations_showConfirm_jsConfirm.html) - Implements showConfirm facade.
    - testDelay
      - [configurableTestDelay](https://ilyub.github.io/typescript-framework/modules/facade_implementations_testDelay_configurableTestDelay.html) - Implements testDelay facade.
    - uniqueId
      - [uuidWrapper](https://ilyub.github.io/typescript-framework/modules/facade_implementations_uniqueId_uuidWrapper.html) - Implements uniqueId facade.
  - plugins
    - [shortcuts](https://ilyub.github.io/typescript-framework/modules/plugins_shortcuts.html) - Handles shortcuts.
  - [testUtils](https://ilyub.github.io/typescript-framework/modules/testUtils.html) - Test utils.

## <a name="installation"></a>Installation

    npm install @skylib/framework
