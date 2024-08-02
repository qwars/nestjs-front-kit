
export tag Application < output
	prop waiting default: false
	prop env default: window:pseudoenv or process:env
	prop channel default: BroadcastChannel.new 'admin-ui'

	def setup

		@channel.addEventListener 'message', do|e|
			console.log 'message', e

		const output = self
		extend tag element
			def application
				output

	def render
		<self .loading=@waiting>
