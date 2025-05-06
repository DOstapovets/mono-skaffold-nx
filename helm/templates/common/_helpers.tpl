{{/*
Define common labels
*/}}
{{- define "common.labels" -}}
app.kubernetes.io/name: {{ .Release.Name }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version }}
{{- end -}}

{{/*
Define client labels
*/}}
{{- define "client.labels" -}}
{{ include "common.labels" . }}
app.kubernetes.io/component: client
{{- end -}}

{{/*
Define server labels
*/}}
{{- define "server.labels" -}}
{{ include "common.labels" . }}
app.kubernetes.io/component: server
{{- end -}}

{{/*
Define client fullname
*/}}
{{- define "client.fullname" -}}
{{- printf "%s-client" .Release.Name -}}
{{- end -}}

{{/*
Define server fullname
*/}}
{{- define "server.fullname" -}}
{{- printf "%s-server" .Release.Name -}}
{{- end -}}

{{/*
Define redis fullname
*/}}
{{- define "redis.fullname" -}}
{{- printf "%s-redis" .Release.Name -}}
{{- end -}}