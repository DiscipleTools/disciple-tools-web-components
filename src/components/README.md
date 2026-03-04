# Component Hierarchy

This document outlines the inheritance hierarchy of the web components found in the `src/components` directory.

```
- LitElement (from 'lit' library)
  - DtCheckmark
  - DtExclamationCircle
  - DtSpinner
  - DtStar
  - DtBase
    - DtCopyText
    - DtLabel
    - DtButton
    - DtAlert
    - DtTile
    - DtModal
    - DtList
    - DtMapModal
    - DtLocationMapItem
    - DtIcon
    - DtChurchHealthIcon
    - DtFormBase
      - DtText
        - DtMultiText
      - DtTextArea
      - DtNumberField
      - DtDate
        - DtDatetime
      - DtToggle
      - DtSingleSelect
      - DtMultiSelectButtonGroup
      - DtMultiSelect (via HasOptionsList mixin)
        - DtTags
          - DtLocation
          - DtUsersConnection
          - DtConnection
        - DtChurchHealthCircle
      - DtLocationMap
```
