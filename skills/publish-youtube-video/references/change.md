# Change

A draft that is not published yet can change through `social.content.artifact_update` (`artifact_id`, `expected_revision`). If that returns `published_immutable`, `social.content.replacement_create` (`artifact_id`, `expected_revision`) copies a new draft and does not publish. That new draft still needs its own yes before publish. Do not call `social.content.delete_republish_propose`.
