<template>
    <div>
        <div class="dialog" v-if="visible">
            <div class="dialogContent" @keypress.enter="confirmEmit()" :style="dialogStyle" :ref="'dialog' + timespan">
                <div class="head" @mousedown="dialogMouseDown($event)" @mouseup="dialogMouseUp($event)">
                    <span class="t">{{ data.title }}</span>
                </div>
                <div class="l_cnt" :style="{height: (height || data.height) ? (((height || data.height) / 10)+'rem'): 'auto',width: (width || data.width) ? (((width || data.width) / 10)+'rem') : 'auto'}">
                    <slot></slot>
                </div>
                <div class="l_btn" v-if="data.noButton != false">
                    <template v-if="data.defaultButton != false">
                        <input type="button" :value="data.cancelButtonText || $t('button.cancel')" class="cancel blueview-grey-btn" @click="cancel()">
                        <input type="button" :value="data.confirmButtonText || $t('button.confirm')" class="confirm blueview-default-btn" v-if="isConfirmBtn != false" @click="confirmEmit()">    
                    </template>
                    <slot name="operate"></slot>
                </div>
                <i class="iconfont iconfuanbi dialog_close" @click="cancel()"></i>
            </div>
        </div>
    </div>
</template>